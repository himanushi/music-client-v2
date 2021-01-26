import { Track } from "graphql/types";
import { Machine } from "xstate";

type PlayerContext = {
  track?: Track;
};

type PlayerStateSchema = {
  states: {
    none: {};
    playing: {};
    paused: {};
    stopped: {};
  };
};

export type PlayerStateEvent =
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "STOP" };

export const PlayerMachine = Machine<
  PlayerContext,
  PlayerStateSchema,
  PlayerStateEvent
>({
  id: "player",
  initial: "none",
  states: {
    none: {
      on: { PLAY: "playing" },
    },
    playing: {
      on: { PAUSE: "paused", STOP: "stopped" },
    },
    paused: {
      on: { PLAY: "playing" },
    },
    stopped: {
      type: "final",
      on: { PLAY: "playing" },
    },
  },
});
