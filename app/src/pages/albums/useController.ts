import { Album, AlbumsQueryVariables } from "graphql/types";
import useAlbumsCountQuery from "hooks/models/useAlbumsCountQuery";
import useAlbumsQuery from "hooks/models/useAlbumsQuery";
import { useState } from "react";

const limit = 50;

const useController = (params: AlbumsQueryVariables, skip: boolean) => {
  const [memoResult, setMemoResult] = useState<Album[]>([]);

  const albumQuery = useAlbumsQuery({
    variables: params,
    fetchPolicy: "cache-first",
    skip,
  });

  const albumCountQuery = useAlbumsCountQuery({
    variables: { conditions: params.conditions },
    fetchPolicy: "cache-first",
    skip,
  });

  let _hasNext = true;
  if (albumQuery.data?.albums && albumCountQuery.data?.albumsCount) {
    _hasNext =
      albumQuery.data?.albums.length < albumCountQuery.data.albumsCount;
  }

  const hasNext = () => _hasNext;

  if (
    !skip &&
    albumQuery.data?.albums &&
    memoResult !== albumQuery.data?.albums
  ) {
    setMemoResult(albumQuery.data.albums);
  }

  return {
    albums: memoResult,
    loading: albumQuery.loading || albumCountQuery.loading,
    error: albumQuery.error,
    loadMore: buildLoadMore(albumQuery.fetchMore),
    hasNext,
  };
};

export default useController;

const buildLoadMore = (fetchMore: any) => {
  return (rowIndex: number, rowCount: number, itemCount: number) => {
    if (rowIndex === rowCount) {
      console.log("fetchMore");
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
