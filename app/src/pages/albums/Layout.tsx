import { IonContent } from "@ionic/react";
import ImageCardItem from "components/ImageCardItem";
import InfiniteList from "components/InfiniteList";
import { Album } from "graphql/types";
import useCardSize from "hooks/util/useCardSize";
import React from "react";

export const Layout = ({ albums }: { albums: Album[] }) => {
  const { cardWidth, cardHeight, parentWidth } = useCardSize();

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
      />
    </IonContent>
  );
};
