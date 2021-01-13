import { BaseQueryOptions } from "@apollo/client";
import { Album, AlbumsDocument, AlbumsQueryVariables } from "graphql/types";
import useModelsQuery from "hooks/models/useModelsQuery";

export type TData = {
  albums: Album[];
};

export type TVariables = BaseQueryOptions<AlbumsQueryVariables>;

const useAlbumsQuery = (variables?: TVariables) =>
  useModelsQuery<TData, TVariables>(AlbumsDocument, variables);

export default useAlbumsQuery;
