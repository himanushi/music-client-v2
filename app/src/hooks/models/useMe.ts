import { CurrentUser, MeDocument, MeQueryVariables } from "graphql/types";
import useModels from "hooks/models/useModels";

export type TData = {
  me: CurrentUser;
};

export type TVariables = {
  variables: MeQueryVariables;
};

const useMe = () => useModels<TData, TVariables>(MeDocument);

export default useMe;
