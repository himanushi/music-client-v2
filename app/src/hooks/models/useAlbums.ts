import { BaseQueryOptions } from "@apollo/client";
import { Album, AlbumsDocument, AlbumsQueryVariables } from "graphql/types";
import useModels from "hooks/models/useModels";

export type TData = {
  albums: Album[];
};

export type TVariables = BaseQueryOptions<AlbumsQueryVariables>;

const useAlbums = (variables?: TVariables) =>
  useModels<TData, TVariables>(AlbumsDocument, variables);

export default useAlbums;
