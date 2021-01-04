import { IonContent } from "@ionic/react";
import { AutoGrid } from "components/AutoGrid";
import ImageCard from "components/ImageCard";
import { Album } from "graphql/types";
import useCardWidth from "hooks/util/useCardWidth";
import React from "react";

export const Layout = ({ albums }: { albums: Album[] }) => {
  const { cardWidth, parentWidth } = useCardWidth();

  const items = albums.map((album) => (
    <ImageCard name={album.name} url={album.artworkM.url} width={cardWidth} />
  ));

  return (
    <IonContent className="ion-no-padding">
      <AutoGrid items={items} width={parentWidth} />
    </IonContent>
  );
};
