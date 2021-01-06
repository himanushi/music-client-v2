import { CurrentUser, MeDocument, MeQueryVariables } from "graphql/types";
import useModels from "hooks/models/useModels";

interface Data {
  me: CurrentUser;
}

type TVariables = { variables: MeQueryVariables };

const useMe = () => useModels<Data, TVariables>(MeDocument);

export default useMe;
