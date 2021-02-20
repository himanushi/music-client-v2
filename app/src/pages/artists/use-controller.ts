import useArtistsQuery from "hooks/models/use-artists-query";

const limit = 50;

const useController = () => {
  const { data, loading, error, fetchMore } = useArtistsQuery({
    fetchPolicy: "cache-and-network",
    variables: { cursor: { limit } },
  });

  const hasNext = () => true;

  return {
    artists: data?.artists,
    error,
    hasNext,
    loadMore: buildLoadMore(fetchMore),
    loading,
  };
};

export default useController;

const buildLoadMore = (fetchMore: any) => (
  rowIndex: number,
  rowCount: number,
  itemCount: number
) => {
  if (rowIndex === rowCount) {
    return fetchMore({
      variables: {
        cursor: {
          limit,
          offset: itemCount,
        },
      },
    });
  }

  return new Promise(() => {
    // 何もしない
  });
};
