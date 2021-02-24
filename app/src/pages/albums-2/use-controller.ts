import { Album, AlbumsQueryVariables } from "graphql/types";
import useAlbumsCountQuery from "hooks/models/use-albums-count-query";
import useAlbumsQuery from "hooks/models/use-albums-query";
import { useState } from "react";

const limit = 50;

const useController = (params: AlbumsQueryVariables) => {
  const [albums, setAlbums] = useState<Album[]>([]);

  const albumQuery = useAlbumsQuery({
    fetchPolicy: "cache-first",
    variables: params,
  });

  if (albumQuery.data?.albums && albums !== albumQuery.data?.albums) {
    setAlbums(albumQuery.data?.albums);
  }

  return {
    albums,
    error: albumQuery.error,
    loadMore: buildLoadMore(albumQuery.fetchMore),
    loading: albumQuery.loading,
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
