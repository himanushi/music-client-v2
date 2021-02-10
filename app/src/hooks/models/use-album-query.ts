import { QueryFunctionOptions } from "@apollo/client";
import { Album, AlbumDocument, AlbumQueryVariables } from "graphql/types";
import useModelsQuery from "hooks/models/use-models-query";

export type TData = {
  album: Album;
};

export type TVariables = QueryFunctionOptions<AlbumQueryVariables>;

const useAlbumQuery = (variables?: TVariables) =>
  useModelsQuery<TData, TVariables>(AlbumDocument, variables);

export default useAlbumQuery;
