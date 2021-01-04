import { IonCol, IonContent, IonRow } from "@ionic/react";
import { useWindowWidth } from "@react-hook/window-size";
import { AutoGrid } from "components/AutoGrid";
import ImageCard from "components/ImageCard";
import { Album } from "graphql/types";
import React from "react";

export const Layout = ({ albums }: { albums: Album[] }) => {
  const items = albums.map((album) => (
    <ImageCard name={album.name} url={album.artworkM.url} width={150} />
  ));

  return (
    <IonContent className="ion-no-padding">
      <AutoGrid items={items} width={180} />
    </IonContent>
  );
};
