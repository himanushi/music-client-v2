import { Track } from "graphql/types";
import { Howl } from "howler";
import { Machine, State, assign, send } from "xstate";

export type PreviewPlayerContext = {
  track: Track;
  player?: Howl;
};

export type PreviewPlayerStateSchema = {
  states: {
    idle: {};
    loading: {};
    playing: {};
    paused: {};
    stopped: {};
  };
};

export type PreviewPlayerStateEvent =
  | { type: "INITIALIZE_PLAY"; track: Track }
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

    states: {
      idle: {
        on: {
          PLAY: "loading",
        },
      },
      loading: {
        entry: ["setPlayer", "play"],
      },
      playing: {
        entry: send("NEXT_PLAY", { delay: 3000 }),
        on: {
          PAUSE: "paused",
          LOADING: "loading",
          STOP: "stopped",
        },
      },
      paused: {
        on: { PLAY: "playing" },
      },
      stopped: {
        on: { PLAY: { target: "playing" } },
      },
    },
  },
  {
    actions: {
      play: ({ player }) => {
        if (player) player.play();
      },

      stop: () => console.log("stop"),

      setPlayer: assign({
        player: ({ track }) => {
          if (!track || !track.previewUrl) return;

          const howl: Howl = new Howl({
            src: track.previewUrl,
            html5: true,
            preload: false,
            autoplay: false,
            onplay: () => {
              if (howl.volume() === 0) howl.fade(0, 0.5, 2000);
              // フェードアウト
              // ref: https://stackoverflow.com/questions/56043259/how-to-make-a-fade-out-at-the-end-of-the-sound-in-howlerjs
              var fadeouttime = 2000;
              setTimeout(
                () => howl.fade(0.5, 0, fadeouttime),
                (howl.duration() - (howl.seek() as number)) * 1000 - fadeouttime
              );
            },
            onstop: () => howl.volume(0),
            volume: 0,
          });

          return howl;
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
