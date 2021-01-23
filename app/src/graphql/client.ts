import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  credentials: "include",
});

const headersLink = new ApolloLink((operation, forward) => forward(operation));

const link = ApolloLink.from([headersLink, httpLink]);

const offsetLimitPagination = {
  keyArgs: ["conditions"],
  merge(existing = [], incoming = [], _args: any) {
    return [...existing, ...incoming];
  },
};

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        albums: offsetLimitPagination,
        artists: offsetLimitPagination,
      },
    },
  },
});

export default new ApolloClient({ link, cache });
