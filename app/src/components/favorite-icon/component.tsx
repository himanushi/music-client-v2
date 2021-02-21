import React from "react";
import { Favorite, FavoriteOutline } from "./layout";
import useController from "./use-controller";

const FavoriteComponent = ({ id }: { id: string }) => {
  const { changeFavorite, favorite } = useController(id);

  if (favorite) return <Favorite id={id} changeFavorite={changeFavorite} />;
  return <FavoriteOutline id={id} changeFavorite={changeFavorite} />;
};

export default FavoriteComponent;
