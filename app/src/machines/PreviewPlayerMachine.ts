import { Track } from "graphql/types";
import { Howl } from "howler";
import { Machine, State, assign, send } from "xstate";

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
    error: {};
    finished: {};
  };
};

export type PreviewPlayerStateEvent =
  | { type: "SET_TRACK"; track: Track }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "STOP" }
  | { type: "LOADING" };

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
      idle: {
        on: {
          PLAY: "loading",
        },
      },

      loading: {
        entry: ["stop", send("PLAY")],
        on: { PLAY: "playing" },
        exit: ["setPlayer", "play"],
      },

      playing: {
        on: {
          PAUSE: "paused",
          LOADING: "loading",
        },
      },

      paused: {
        on: { PLAY: "playing" },
      },

      error: {
        type: "final",
      },

      finished: {
        type: "final",
      },
    },
    on: {
      SET_TRACK: { actions: ["setTrack"], target: "loading" },
    },
  },
  {
    actions: {
      play: ({ track, player }) => {
        if (track && player) console.log(player.play());
      },

      stop: ({ player }) => {
        console.log("stop");
        if (player && player.playing()) {
          player.stop();
        }
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

  console.log("setHowl");
  const howl: Howl = new Howl({
    src: track.previewUrl,
    html5: true,
    preload: false,
    autoplay: false,
    onplay: () => {
      const volume = 0.5;
      const fadeouttime = 2000;
      if (howl.volume() === 0) howl.fade(0, volume, fadeouttime);
      // フェードアウト
      // ref: https://stackoverflow.com/questions/56043259/how-to-make-a-fade-out-at-the-end-of-the-sound-in-howlerjs
      setTimeout(
        () => howl.fade(volume, 0, fadeouttime),
        (howl.duration() - (howl.seek() as number)) * 1000 - fadeouttime
      );
    },
    onstop: () => howl.volume(0),
    volume: 0,
  });

  return howl;
};
