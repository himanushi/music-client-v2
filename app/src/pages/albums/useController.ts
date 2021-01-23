import { AlbumQueryVariables, AlbumsQueryVariables } from "graphql/types";
import useAlbumsCountQuery from "hooks/models/useAlbumsCountQuery";
import useAlbumsQuery from "hooks/models/useAlbumsQuery";
import useParameters from "hooks/util/useParameters";
import { useState } from "react";

const limit = 50;

const useController = () => {
  // const params = useParameters<AlbumsQueryVariables>("album");
  const [name, setName] = useState("");

  const params = {
    conditions: { name },
    cursor: { limit: 50, offset: 0 },
  };

  const albumQuery = useAlbumsQuery({
    variables: params,
    fetchPolicy: "cache-and-network",
  });

  const albumCountQuery = useAlbumsCountQuery({
    variables: { conditions: params.conditions },
    fetchPolicy: "cache-first",
  });

  let _hasNext = true;
  if (albumQuery.data?.albums && albumCountQuery.data?.albumsCount) {
    _hasNext =
      albumQuery.data?.albums.length < albumCountQuery.data.albumsCount;
  }

  const hasNext = () => _hasNext;

  return {
    albums: albumQuery.data?.albums,
    loading: albumQuery.loading || albumCountQuery.loading,
    error: albumQuery.error,
    loadMore: buildLoadMore(albumQuery.fetchMore),
    hasNext,
    setName,
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
