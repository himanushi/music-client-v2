import useFavoriteMutation from "hooks/models/use-favorite-mutation";
import useMeQuery from "hooks/models/use-me-query";
import { getFavoriteIds, isFavorite } from "lib/favorite";
import { useState } from "react";

const useController = (id: string) => {
  const meQuery = useMeQuery();

  let favoriteIds: string[] = [];
  if (meQuery.data?.me) favoriteIds = getFavoriteIds(meQuery.data.me);

  const [favorite] = useState(isFavorite(id, favoriteIds));

  const [changeFavorite] = useFavoriteMutation();

  return { changeFavorite, favorite };
};

export default useController;
