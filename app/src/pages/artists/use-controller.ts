import useArtistsQuery from "hooks/models/use-artists-query";

const limit = 50;

const useController = () => {
  const { data, loading, error, fetchMore } = useArtistsQuery({
    variables: { cursor: { limit } },
    fetchPolicy: "cache-and-network",
  });

  const hasNext = () => true;

  return {
    artists: data?.artists,
    loading,
    error,
    loadMore: buildLoadMore(fetchMore),
    hasNext,
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
