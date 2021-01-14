import ImageCard from "components/cards/ImageCard";
import { Album } from "graphql/types";
import React from "react";

type Props = {
  album: Album;
};

export const Layout: React.FC<Props> = ({ album }) => {
  const item = <Item album={album} width={200} />;

  return item;
};

type ItemProps = {
  album: Album;
  width: number;
};

const Item = React.memo((props: ItemProps) => {
  return (
    <ImageCard
      name={props.album.name}
      src={props.album.artworkM.url as string | undefined}
      width={props.width}
    />
  );
});
