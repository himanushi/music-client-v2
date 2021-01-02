import { IonContent, IonPage } from "@ionic/react";
import ImageCard from "components/ImageCard";
import { Album } from "graphql/types";
import React from "react";

const Layout = ({ albums }: { albums: Album[] }) => {
  return (
    <IonPage>
      <IonContent>
        {albums.map((album) => {
          return <ImageCard name={album.name} url={album.artworkM.url} />;
        })}
      </IonContent>
    </IonPage>
  );
};

export default Layout;
