import { IonCard, IonCardContent, IonImg, IonText } from "@ionic/react";
import React from "react";

const AlbumItem: React.FC = () => {
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

export default AlbumItem;
