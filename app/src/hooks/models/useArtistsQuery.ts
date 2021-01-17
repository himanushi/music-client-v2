import { BaseQueryOptions } from "@apollo/client";
import { Artist, ArtistsDocument, ArtistsQueryVariables } from "graphql/types";
import useModelsQuery from "hooks/models/useModelsQuery";

export type TData = {
  artists: Artist[];
};

export type TVariables = BaseQueryOptions<ArtistsQueryVariables>;

const useArtistsQuery = (variables?: TVariables) =>
  useModelsQuery<TData, TVariables>(ArtistsDocument, variables);

export default useArtistsQuery;
