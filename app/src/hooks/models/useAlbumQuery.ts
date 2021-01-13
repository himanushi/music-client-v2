import { BaseQueryOptions } from "@apollo/client";
import { Album, AlbumDocument, AlbumQueryVariables } from "graphql/types";
import useModelsQuery from "hooks/models/useModelsQuery";

export type TData = {
  album: Album;
};

export type TVariables = BaseQueryOptions<AlbumQueryVariables>;

const useAlbumQuery = (variables?: TVariables) =>
  useModelsQuery<TData, TVariables>(AlbumDocument, variables);

export default useAlbumQuery;
