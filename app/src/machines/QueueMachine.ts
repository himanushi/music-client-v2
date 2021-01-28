import { Track } from "graphql/types";
import { Machine } from "xstate";

type QueueContext = {
  items: Track[];
};

type QueueStateSchema = {
  states: {
    active: {};
  };
};

export type QueueStateEvent =
  | { type: "ADD_ITEMS" }
  | { type: "ALL_REPLACE_ITEMS" };

export const QueueMachine = Machine<
  QueueContext,
  QueueStateSchema,
  QueueStateEvent
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
