import { BaseQueryOptions } from "@apollo/client";
import { AlbumsCountDocument, AlbumsCountQueryVariables } from "graphql/types";
import useModelsQuery from "hooks/models/useModelsQuery";

export type TData = {
  albumsCount: number;
};

export type TVariables = BaseQueryOptions<AlbumsCountQueryVariables>;

const useAlbumsCountQuery = (variables?: TVariables) =>
  useModelsQuery<TData, TVariables>(AlbumsCountDocument, variables);

export default useAlbumsCountQuery;
