import { QueryFunctionOptions } from "@apollo/client";
import { CurrentUser, MeDocument, MeQueryVariables } from "graphql/types";
import useModelsQuery from "hooks/models/useModelsQuery";

export type TData = {
  me: CurrentUser;
};

export type TVariables = QueryFunctionOptions<MeQueryVariables>;

const useMeQuery = () => useModelsQuery<TData, TVariables>(MeDocument);

export default useMeQuery;
