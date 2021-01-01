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
import React, { useState } from "react";

const Album: React.FC = () => {
  return (
    <IonCard style={{ width: "150px" }}>
      <IonImg
        style={{ width: "150px", height: "150px" }}
        src="https://i.scdn.co/image/ab67616d0000b273e62378fa4987315f4147e9af"
      />
      <IonCardContent>
        <IonText>
          <p>CardExamplesCardExamplesCardExamples</p>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default Album;
