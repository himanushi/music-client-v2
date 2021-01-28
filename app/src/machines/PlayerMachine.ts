import { inspect } from "@xstate/inspect";
import { Track } from "graphql/types";
import { Machine, assign } from "xstate";

type PlayerContext = {
  currentPlaybackNo: number;
  tracks: Track[];
  repeat: boolean;
};

type PlayerStateSchema = {
  states: {
    loading: {};
    playing: {};
    paused: {};
    stopped: {};
    finished: {};
  };
};

export type PlayerStateEvent =
  // Queue
  | { type: "REPLACE"; tracks: Track[] }
  | { type: "SHUFFLE" }
  // Player
  | { type: "PLAY" }
  | { type: "NEXT" }
  | { type: "PREVIOUS" }
  | { type: "PAUSE" }
  | { type: "STOP" }
  | { type: "SEEK" }
  | { type: "REPEAT" };

export const PlayerMachine = Machine<
  PlayerContext,
  PlayerStateSchema,
  PlayerStateEvent
>(
  {
    id: "player",
    initial: "stopped",
    context: {
      currentPlaybackNo: 0,
      tracks: [],
      repeat: false,
    },
    states: {
      loading: {
        entry: () => console.log("entry loading"),
      },
      playing: {
        on: { PAUSE: "paused", STOP: "stopped" },
      },
      paused: {
        on: { PLAY: "playing" },
      },
      stopped: {
        on: { PLAY: { target: "loading", actions: ["play"] } },
      },
      finished: {
        type: "final",
      },
    },
    on: {
      REPLACE: { actions: ["stop", "replace"], target: "playing" },
    },
  },
  {
    actions: {
      replace: assign({
        tracks: (_, event) => (event.type === "REPLACE" ? event.tracks : []),
      }),
      stop: () => console.log("stop"),
    },
  }
);

inspect({ iframe: false });
