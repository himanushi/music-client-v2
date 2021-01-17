import { BaseQueryOptions } from "@apollo/client";
import { Artist, ArtistDocument, ArtistQueryVariables } from "graphql/types";
import useModelsQuery from "hooks/models/useModelsQuery";

export type TData = {
  artist: Artist;
};

export type TVariables = BaseQueryOptions<ArtistQueryVariables>;

const useArtistQuery = (variables?: TVariables) =>
  useModelsQuery<TData, TVariables>(ArtistDocument, variables);

export default useArtistQuery;
