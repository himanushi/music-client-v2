import { IonContent } from "@ionic/react";
import ImageCardItem from "components/ImageCardItem";
import InfiniteList from "components/InfiniteList";
import { Album } from "graphql/types";
import useCardItemSize from "hooks/layouts/useCardItemSize";
import React from "react";

export const Layout = ({
  albums,
  loadMore,
}: {
  albums: Album[];
  loadMore: (startIndex: number, stopIndex: number) => Promise<any>;
}) => {
  const { cardWidth, cardHeight, parentWidth } = useCardItemSize();

  const items = albums.map((album) => (
    <ImageCardItem
      name={album.name}
      url={album.artworkM.url}
      width={cardWidth}
    />
  ));

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
