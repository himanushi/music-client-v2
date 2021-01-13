import { AlbumsQueryVariables } from "graphql/types";
import useAlbums from "hooks/models/useAlbums";
import useParameters from "hooks/util/useParameters";

const limit = 50;

const useController = () => {
  const params = useParameters<AlbumsQueryVariables>("album");

  const { data, loading, error, fetchMore } = useAlbums({
    variables: params,
    fetchPolicy: "cache-and-network",
  });

  const isLoaded = () => false;

  return {
    albums: data?.albums,
    loading,
    error,
    loadMore: buildLoadMore(fetchMore),
    isLoaded,
  };
};

export default useController;

const buildLoadMore = (fetchMore: any) => {
  return (rowIndex: number, rowCount: number, itemCount: number) => {
    if (rowIndex === rowCount) {
      return fetchMore({
        variables: {
          cursor: {
            offset: itemCount,
            limit,
          },
        },
      });
    }

    return new Promise(() => {});
  };
};
