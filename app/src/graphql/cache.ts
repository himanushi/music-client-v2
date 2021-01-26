import { InMemoryCache, makeVar } from "@apollo/client";
import { Track } from "graphql/types";

export const queueTracksVar = makeVar<readonly Track[]>([]);

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
            return queueTracksVar();
          },
        },
      },
    },
  },
});
