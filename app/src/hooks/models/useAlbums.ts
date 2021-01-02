import { Album, AlbumsDocument, AlbumsQueryVariables } from "graphql/types";
import useModels from "hooks/models/useModels";

interface Data {
  items: Album[];
}

const useAlbums = (variables?: AlbumsQueryVariables) =>
  useModels<Data, AlbumsQueryVariables>(AlbumsDocument, variables);

export default useAlbums;
