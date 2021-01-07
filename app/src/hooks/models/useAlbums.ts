import { Album, AlbumsDocument, AlbumsQueryVariables } from "graphql/types";
import useModels from "hooks/models/useModels";

export type TData = {
  items: Album[];
};

export type TVariables = {
  variables: AlbumsQueryVariables;
};

const useAlbums = (variables?: TVariables) =>
  useModels<TData, TVariables>(AlbumsDocument, variables);

export default useAlbums;
