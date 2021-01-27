import { Track } from "graphql/types";
import { Machine } from "xstate";

type PlayerQueueContext = {
  items: Track[];
};

type PlayerQueueStateSchema = {
  states: {
    active: {};
  };
};

export type PlayerQueueStateEvent =
  | { type: "ADD_ITEMS" }
  | { type: "ALL_REPLACE_ITEMS" };

export const PlayerMachine = Machine<
  PlayerQueueContext,
  PlayerQueueStateSchema,
  PlayerQueueStateEvent
>({
  id: "queue",
  initial: "active",
  context: {
    items: [],
  },
  states: {
    active: {
      on: {
        ADD_ITEMS: { actions: "" },
        ALL_REPLACE_ITEMS: { actions: "" },
      },
    },
  },
});
