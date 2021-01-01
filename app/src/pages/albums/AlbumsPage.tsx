import { IonContent, IonPage } from "@ionic/react";
import Album from "pages/albums/Album";
import React from "react";

const AlbumsPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <Album />
      </IonContent>
    </IonPage>
  );
};

export default AlbumsPage;
