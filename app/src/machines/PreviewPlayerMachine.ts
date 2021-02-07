import { Track } from "graphql/types";
import { Howl } from "howler";
import { Machine, State, assign, send, sendParent } from "xstate";

export type PreviewPlayerContext = {
  track?: Track;
  player?: Howl;
  seek: number;
};

export type PreviewPlayerStateSchema = {
  states: {
    idle: {};
    loading: {};
    playing: {};
    paused: {};
    stopped: {};
    finished: {};
  };
};

export type PreviewPlayerStateEvent =
  | { type: "SET_TRACK"; track: Track }
  | { type: "CHANGE_SEEK"; seek: number }
  | { type: "LOAD" }
  | { type: "PLAY" }
  | { type: "PLAYING" }
  | { type: "PAUSE" }
  | { type: "PAUSED" }
  | { type: "STOP" }
  | { type: "STOPPED" }
  | { type: "FINISHED" }
  | { type: "TICK" };

export const PreviewPlayerMachine = Machine<
  PreviewPlayerContext,
  PreviewPlayerStateSchema,
  PreviewPlayerStateEvent
>(
  {
    id: "preview",
    initial: "idle",

    context: {
      track: undefined,
      player: undefined,
      seek: 0,
    },

    states: {
      idle: {},

      loading: {
        entry: ["stop", send("PLAYING")],
        exit: ["setPlayer", "play"],
      },

      playing: {
        entry: [sendParent("PLAYING")],
        invoke: {
          id: "playingListener",
          src: ({ player }: PreviewPlayerContext) => (callback) => {
            if (player) {
              player.on("pause", () => callback("PAUSED"));

              player.on("end", () => callback("FINISHED"));

              let timeoutID: NodeJS.Timeout;
              const volume = 0.5;
              const fadeouttime = 2000;

              const fadeIn = () => {
                if (player.volume() === 0) {
                  player.fade(0, volume, fadeouttime);
                } else {
                  player.volume(volume);
                }
              };

              const setScheduleFadeOut = () => {
                timeoutID = setTimeout(() => {
                  player.fade(volume, 0, fadeouttime);
                }, (player.duration() - (player.seek() as number)) * 1000 - fadeouttime);
              };

              player.on("play", () => {
                fadeIn();
                setScheduleFadeOut();
              });

              player.on("seek", () => {
                clearTimeout(timeoutID);
                setScheduleFadeOut();
              });

              return () => {
                clearTimeout(timeoutID);
                player.off("play");
                player.off("pause");
                player.off("end");
                player.off("seek");
              };
            }
          },
        },
        on: {
          PAUSE: { actions: ["pause"] },
          PAUSED: "paused",
          FINISHED: "finished",
        },
      },

      paused: {
        entry: [sendParent("PAUSED")],
      },

      stopped: {
        entry: [sendParent("STOPPED")],
        exit: ["setPlayer"],
      },

      finished: {
        entry: [sendParent("FINISHED")],
      },
    },
    on: {
      PLAY: { actions: ["play"], target: "playing" },

      PLAYING: "playing",

      STOP: { actions: ["stop"], target: "stopped" },

      SET_TRACK: { actions: ["setTrack"] },

      LOAD: { target: "loading" },

      TICK: {
        actions: [
          "tick",
          sendParent(({ seek }) => {
            return { type: "SET_SEEK", seek };
          }),
        ],
      },

      CHANGE_SEEK: { actions: ["changeSeek"] },
    },
  },
  {
    actions: {
      play: ({ player }) => {
        if (player) player.play();
      },

      pause: ({ player }) => {
        if (player && player.playing()) player.pause();
      },

      stop: ({ player }) => {
        if (player && player.playing()) player.stop();
      },

      setTrack: assign({
        track: (_, event) => ("track" in event ? event.track : undefined),
      }),

      changeSeek: ({ player }, event) => {
        if (player && "seek" in event) {
          player.seek(event.seek / 1000);
        }
      },

      setPlayer: assign({
        player: ({ track }) => (track ? setPlayer(track) : undefined),
      }),

      tick: assign({
        seek: ({ player }) => {
          if (player) {
            const _seek = player.seek() as number;
            return Math.floor(_seek * 1000);
          }
          return 0;
        },
      }),
    },
  }
);

export type PreviewPlayerState = State<
  PreviewPlayerContext,
  PreviewPlayerStateEvent,
  PreviewPlayerStateSchema,
  {
    value: any;
    context: PreviewPlayerContext;
  }
>;

const setPlayer = (track: Track) => {
  if (!track || !track.previewUrl) return;

  const howl: Howl = new Howl({
    src: track.previewUrl,
    html5: true,
    preload: false,
    autoplay: false,
    volume: 0,
  });

  return howl;
};
