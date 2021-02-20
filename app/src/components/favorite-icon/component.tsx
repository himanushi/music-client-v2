import React from "react";
import { Favorite, FavoriteOutline } from "./layout";
import useController from "./use-controller";

const FavoriteComponent = ({ id }: { id: string }) => {
  const { ids } = useController();
  if (ids.length === 0 || !ids.includes(id)) {
    return <FavoriteOutline />;
  }
  return <Favorite id={id} />;
};

export default FavoriteComponent;
