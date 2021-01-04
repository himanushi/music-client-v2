import { Album, AlbumsDocument, AlbumsQueryVariables } from "graphql/types";
import useModels from "hooks/models/useModels";

interface Data {
  items: Album[];
}

type TVariables = { variables: AlbumsQueryVariables };

const useAlbums = (variables?: TVariables) =>
  useModels<Data, TVariables>(AlbumsDocument, variables);

export default useAlbums;
