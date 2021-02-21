import { CurrentUser } from "graphql/types";

export const isFavorite = (id: string, ids: string[]) => ids.includes(id);

export const getFavoriteIds = (me?: CurrentUser) => {
  let ids: string[] = [];

  if (me) {
    ids = ids.concat(me.favorite.albumIds);
    ids = ids.concat(me.favorite.albumIds);
    ids = ids.concat(me.favorite.albumIds);
  }

  return ids;
};
