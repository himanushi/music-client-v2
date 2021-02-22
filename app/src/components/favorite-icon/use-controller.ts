import useFavoriteMutation from "hooks/models/use-favorite-mutation";
import useMeQuery from "hooks/models/use-me-query";
import { getFavoriteIds, isFavorite } from "lib/favorite";
import { useState } from "react";

const useController = (id: string, model: "album" | "artist") => {
  // ref: https://github.com/apollographql/apollo-client/issues/6209
  const meQuery = useMeQuery({ fetchPolicy: "standby" });

  let favoriteIds: string[] = [];
  if (meQuery.data?.me) favoriteIds = getFavoriteIds(meQuery.data.me);

  const [favorite, setFavorite] = useState(isFavorite(id, favoriteIds));

  const [changeFavorite] = useFavoriteMutation();

  const ids: {
    albumIds?: string[];
    artistIds?: string[];
  } = {};

  if (model === "album") ids.albumIds = [id];
  if (model === "artist") ids.artistIds = [id];

  const toggleFavorite = () => {
    changeFavorite({
      variables: { input: { favorite: !favorite, ...ids } },
    });
    setFavorite((fav) => !fav);
  };

  return { favorite, toggleFavorite };
};

export default useController;
