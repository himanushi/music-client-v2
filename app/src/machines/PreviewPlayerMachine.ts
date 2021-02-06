import { Track } from "graphql/types";
import { Howl } from "howler";
import { Machine, State, assign, send, sendParent } from "xstate";

export type PreviewPlayerContext = {
  track?: Track;
  player?: Howl;
};

export type PreviewPlayerStateSchema = {
  states: {
    idle: {};
    loading: {};
    playing: {};
    paused: {};
    finished: {};
  };
};

export type PreviewPlayerStateEvent =
  | { type: "SET_TRACK"; track: Track }
  | { type: "LOAD" }
  | { type: "PLAY" }
  | { type: "PLAYING" }
  | { type: "PAUSE" }
  | { type: "PAUSED" }
  | { type: "STOP" }
  | { type: "STOPPED" }
  | { type: "FINISHED" };

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
              player.once("pause", () => callback("PAUSED"));
              player.once("end", () => callback("FINISHED"));
              return () => {
                player.off("pause");
                player.off("end");
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
        invoke: {
          id: "pausedListener",
          src: ({ player }: PreviewPlayerContext) => (callback) => {
            if (player) {
              player.once("play", () => callback("PLAYING"));
              return () => player.off("play");
            }
          },
        },
      },

      finished: {
        entry: [sendParent("FINISHED")],
      },
    },
    on: {
      PLAY: { actions: ["play"] },

      PLAYING: "playing",

      SET_TRACK: { actions: ["setTrack"] },

      LOAD: { target: "loading" },
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

      setPlayer: assign({
        player: ({ track }) => (track ? setPlayer(track) : undefined),
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
    volume: 0.5,
  });

  return howl;
};
