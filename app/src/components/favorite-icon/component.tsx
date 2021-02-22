import React from "react";
import { Favorite, FavoriteOutline } from "./layout";
import useController from "./use-controller";

type Props = {
  id: string;
  model: "album" | "artist";
};

const FavoriteComponent = ({ id, model }: Props) => {
  const { toggleFavorite, favorite } = useController(id, model);

  if (favorite) return <Favorite toggleFavorite={toggleFavorite} />;
  return <FavoriteOutline toggleFavorite={toggleFavorite} />;
};

export default FavoriteComponent;
