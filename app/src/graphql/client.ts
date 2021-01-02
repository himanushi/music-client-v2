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

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
