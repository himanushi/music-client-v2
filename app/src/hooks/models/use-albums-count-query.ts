import { QueryFunctionOptions } from "@apollo/client";
import { AlbumsCountDocument, AlbumsCountQueryVariables } from "graphql/types";
import useModelsQuery from "hooks/models/use-models-query";

export type TData = {
  albumsCount: number;
};

export type TVariables = QueryFunctionOptions<AlbumsCountQueryVariables>;

const useAlbumsCountQuery = (variables?: TVariables) =>
  useModelsQuery<TData, TVariables>(AlbumsCountDocument, variables);

export default useAlbumsCountQuery;
