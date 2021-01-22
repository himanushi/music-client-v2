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
  keyArgs: [],
  merge(existing = [], incoming = [], _args: any) {
    const args = _args as {
      variables: { cursor?: { limit?: number; offset?: number } };
    };
    if (args.variables.cursor?.offset === 0) {
      return incoming;
    } else {
      return [...existing, ...incoming];
    }
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
