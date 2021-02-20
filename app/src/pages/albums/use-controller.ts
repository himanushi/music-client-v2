import { Album, AlbumsQueryVariables } from "graphql/types";
import useAlbumsCountQuery from "hooks/models/use-albums-count-query";
import useAlbumsQuery from "hooks/models/use-albums-query";
import { useState } from "react";

const limit = 50;

const useController = (params: AlbumsQueryVariables, skip: boolean) => {
  const [memoResult, setMemoResult] = useState<Album[]>([]);

  const albumQuery = useAlbumsQuery({
    fetchPolicy: "cache-first",
    skip,
    variables: params,
  });

  const albumCountQuery = useAlbumsCountQuery({
    fetchPolicy: "cache-first",
    skip,
    variables: { conditions: params.conditions },
  });

  let next = true;
  if (albumQuery.data?.albums && albumCountQuery.data?.albumsCount) {
    next = albumQuery.data?.albums.length < albumCountQuery.data.albumsCount;
  }

  const hasNext = () => next;

  if (
    !skip &&
    albumQuery.data?.albums &&
    memoResult !== albumQuery.data?.albums
  ) {
    setMemoResult(albumQuery.data.albums);
  }

  return {
    albums: memoResult,
    error: albumQuery.error,
    hasNext,
    loadMore: buildLoadMore(albumQuery.fetchMore),
    loading: albumQuery.loading || albumCountQuery.loading,
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
