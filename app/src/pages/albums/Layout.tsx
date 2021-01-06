import { IonContent } from "@ionic/react";
import ImageCardItem from "components/ImageCardItem";
import InfiniteList from "components/InfiniteList";
import { Album } from "graphql/types";
import useCardItemSize from "hooks/layouts/useCardItemSize";
import React from "react";

type Props = {
  albums: Album[];
  loadMore: (startIndex: number, stopIndex: number) => Promise<any>;
};

export const Layout: React.FC<Props> = ({ albums, loadMore }) => {
  const { cardWidth, cardHeight, parentWidth } = useCardItemSize();

  const items = albums.map((album) => <Item album={album} width={cardWidth} />);

  return (
    <IonContent className="ion-no-padding">
      <InfiniteList
        items={items}
        itemWidth={parentWidth}
        itemHeight={cardHeight}
        loadMore={loadMore}
      />
    </IonContent>
  );
};

type ItemProps = {
  album: Album;
  width: number;
};

const Item = React.memo((props: ItemProps) => {
  return (
    <ImageCardItem
      name={props.album.name}
      url={props.album.artworkM.url}
      width={props.width}
    />
  );
});
