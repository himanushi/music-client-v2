import { IonContent, IonPage } from "@ionic/react";
import ImageCard from "components/ImageCard";
import { Album } from "graphql/types";
import React from "react";

export const Layout = ({ albums }: { albums: Album[] }) => {
  return (
    <IonPage>
      <IonContent>
        {albums.map((album, i) => {
          return (
            <ImageCard key={i} name={album.name} url={album.artworkM.url} />
          );
        })}
      </IonContent>
    </IonPage>
  );
};
