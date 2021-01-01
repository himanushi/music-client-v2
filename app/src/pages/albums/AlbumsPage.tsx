import {
  IonActionSheet,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
import { caretForwardCircle, close, heart, share, trash } from "ionicons/icons";
import Album from "pages/albums/Album";
import React, { useState } from "react";

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
