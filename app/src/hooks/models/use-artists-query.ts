import { QueryFunctionOptions } from "@apollo/client";
import { Artist, ArtistsDocument, ArtistsQueryVariables } from "graphql/types";
import useModelsQuery from "hooks/models/use-models-query";

export type TData = {
  artists: Artist[];
};

export type TVariables = QueryFunctionOptions<ArtistsQueryVariables>;

const useArtistsQuery = (variables?: TVariables) =>
  useModelsQuery<TData, TVariables>(ArtistsDocument, variables);

export default useArtistsQuery;
