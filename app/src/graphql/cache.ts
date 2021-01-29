import { InMemoryCache, makeVar } from "@apollo/client";
import { Track } from "graphql/types";

export const queueItemsVar = makeVar<readonly Track[]>([]);
export const playbackNoVar = makeVar<number>(0);

const offsetLimitPagination = {
  keyArgs: ["conditions"],
  merge(existing = [], incoming = [], _args: any) {
    return [...existing, ...incoming];
  },
};

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        albums: offsetLimitPagination,
        artists: offsetLimitPagination,
        queueItems: {
          read() {
            return queueItemsVar();
          },
        },
      },
    },
  },
});
