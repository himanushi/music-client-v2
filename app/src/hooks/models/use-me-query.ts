import { QueryFunctionOptions } from "@apollo/client";
import { CurrentUser, MeDocument, MeQueryVariables } from "graphql/types";
import useModelsQuery from "hooks/models/use-models-query";

export type TData = {
  me: CurrentUser;
};

export type TVariables = QueryFunctionOptions<MeQueryVariables>;

const useMeQuery = (options?: TVariables) =>
  useModelsQuery<TData, TVariables>(MeDocument, options);

export default useMeQuery;
