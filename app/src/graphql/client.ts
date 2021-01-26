import { ApolloClient, ApolloLink, HttpLink } from "@apollo/client/core";
import { cache } from "graphql/cache";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  credentials: "include",
});

const headersLink = new ApolloLink((operation, forward) => forward(operation));

const link = ApolloLink.from([headersLink, httpLink]);

export default new ApolloClient({ link, cache });
