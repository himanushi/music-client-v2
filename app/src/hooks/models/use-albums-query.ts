import { QueryFunctionOptions } from "@apollo/client";
import { Album, AlbumsDocument, AlbumsQueryVariables } from "graphql/types";
import useModelsQuery from "hooks/models/use-models-query";

export type TData = {
  albums: Album[];
};

export type TVariables = QueryFunctionOptions<AlbumsQueryVariables>;

const useAlbumsQuery = (variables?: TVariables) =>
  useModelsQuery<TData, TVariables>(AlbumsDocument, variables);

export default useAlbumsQuery;
