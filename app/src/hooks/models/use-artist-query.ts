import { QueryFunctionOptions } from "@apollo/client";
import { Artist, ArtistDocument, ArtistQueryVariables } from "graphql/types";
import useModelsQuery from "hooks/models/use-models-query";

export type TData = {
  artist: Artist;
};

export type TVariables = QueryFunctionOptions<ArtistQueryVariables>;

const useArtistQuery = (variables?: TVariables) =>
  useModelsQuery<TData, TVariables>(ArtistDocument, variables);

export default useArtistQuery;
