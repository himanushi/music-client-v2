import { Track } from "graphql/types";
import { Machine, State, assign } from "xstate";

import { PlayerContext } from "./PlayerMachine";

export type QueueContext = {
  tracks: Track[];
};

export type QueueStateSchema = {
  states: {
    active: {};
  };
};

export type QueueStateEvent =
  | { type: "GET"; playbackNo: PlayerContext["currentPlaybackNo"] }
  | { type: "REPLACE"; tracks: QueueContext["tracks"] };

export const QueueMachine = Machine<
  QueueContext,
  QueueStateSchema,
  QueueStateEvent
>(
  {
    id: "queue",
    initial: "active",
    context: {
      tracks: [],
    },
    states: {
      active: {},
    },
    on: {
      REPLACE: ["replace"],
    },
  },
  {
    actions: {
      replace: assign((_, event) => {
        if (!("tracks" in event)) return {};
        return { tracks: event.tracks };
      }),
    },
  }
);

export type QueueState = State<
  QueueContext,
  QueueStateEvent,
  QueueStateSchema,
  {
    value: any;
    context: QueueContext;
  }
>;
