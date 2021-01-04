import { Album } from "graphql/types";
import useAlbums from "hooks/models/useAlbums";
import { useEffect, useState } from "react";

const useController = () => {
  const [load, { called, data, loading, error, fetchMore }] = useAlbums();
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    if (!called) load();
    if (data) setAlbums(data.items);
  }, [called, data, load]);

  return { albums, loading, error, loadMore: buildLoadMore(fetchMore) };
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
