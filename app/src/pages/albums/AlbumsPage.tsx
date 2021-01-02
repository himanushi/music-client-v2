import { IonContent, IonPage } from "@ionic/react";
import AlbumItem from "pages/albums/AlbumItem";
import React from "react";

const AlbumsPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <AlbumItem />
      </IonContent>
    </IonPage>
  );
};

export default AlbumsPage;
