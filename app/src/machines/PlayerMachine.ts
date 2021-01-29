import { inspect } from "@xstate/inspect";
import { Track } from "graphql/types";
import { Machine, State, assign, interpret, send } from "xstate";

export type PlayerContext = {
  currentPlaybackNo: number;
  tracks: readonly Track[];
  currentTrack?: Track;
  repeat: boolean;
};

export type PlayerStateSchema = {
  states: {
    idle: {};
    loading: {};
    playing: {};
    paused: {};
    stopped: {};
    finished: {};
  };
};

export type PlayerStateEvent =
  // Queue
  | {
      type: "REPLACE_AND_PLAY";
      tracks: readonly Track[];
      currentPlaybackNo: number;
    }
  | { type: "REPLACE"; tracks: readonly Track[] }
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
    initial: "idle",
    context: {
      currentPlaybackNo: 0,
      tracks: [],
      repeat: false,
    },
    states: {
      idle: {},
      loading: {
        entry: send("PLAY"),
        on: { PLAY: "playing" },
      },
      playing: {
        on: { PAUSE: "paused", STOP: "stopped" },
      },
      paused: {
        on: { PLAY: "playing" },
      },
      stopped: {
        on: { PLAY: { target: "playing" } },
      },
      finished: {
        type: "final",
      },
    },
    on: {
      REPLACE_AND_PLAY: {
        actions: ["replaceTracks", "changePlaybackNo"],
        target: "loading",
      },
    },
  },
  {
    actions: {
      replaceTracks: assign({
        tracks: (_, event) => ("tracks" in event ? event.tracks : []),
      }),
      changePlaybackNo: assign((context, event) => {
        if (!("currentPlaybackNo" in event)) return {};

        return {
          currentPlaybackNo: event.currentPlaybackNo,
          currentTrack: context.tracks[event.currentPlaybackNo],
        };
      }),
      stop: () => console.log("stop"),
    },
  }
);

export type PlayerState = State<
  PlayerContext,
  PlayerStateEvent,
  PlayerStateSchema,
  {
    value: any;
    context: PlayerContext;
  }
>;

inspect({ iframe: false });

export const playerService = interpret(PlayerMachine, {
  devTools: process.env.NODE_ENV === "development",
}).start();
