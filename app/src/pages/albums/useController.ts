import useAlbums from "hooks/models/useAlbums";

const useController = () => {
  const { data, loading, error, fetchMore } = useAlbums();

  return {
    albums: data?.items,
    loading,
    error,
    loadMore: buildLoadMore(fetchMore),
  };
};

export default useController;

const buildLoadMore = (fetchMore: any) => {
  return (startIndex: number, stopIndex: number) => {
    return fetchMore({
      variables: {
        cursor: {
          limit: stopIndex,
          offset: startIndex + stopIndex,
        },
      },
      updateQuery: (
        prev: { items: any[] },
        { fetchMoreResult }: { fetchMoreResult: { items: any[] } }
      ) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          ...{ items: [...prev.items, ...fetchMoreResult.items] },
        };
      },
    });
  };
};
