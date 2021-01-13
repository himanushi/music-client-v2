import { BaseQueryOptions } from "@apollo/client";
import { CurrentUser, MeDocument, MeQueryVariables } from "graphql/types";
import useModels from "hooks/models/useModels";

export type TData = {
  me: CurrentUser;
};

export type TVariables = BaseQueryOptions<MeQueryVariables>;

const useMe = () => useModels<TData, TVariables>(MeDocument);

export default useMe;
