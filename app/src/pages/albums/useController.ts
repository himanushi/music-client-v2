import useAlbums from "hooks/models/useAlbums";

const limit = 50;

const useController = () => {
  const { data, loading, error, fetchMore } = useAlbums({
    variables: { cursor: { limit } },
  });

  return {
    albums: data?.albums,
    loading,
    error,
    loadMore: buildLoadMore(fetchMore),
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
