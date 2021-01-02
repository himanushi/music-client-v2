import { IonCard, IonCardContent, IonImg, IonText } from "@ionic/react";
import { Maybe } from "graphql/types";
import React from "react";

const ImageCard = ({ name, url }: { name: string; url: Maybe<string> }) => {
  return (
    <IonCard style={{ width: "150px" }}>
      <IonImg style={{ width: "150px", height: "150px" }} src={url || ""} />
      <IonCardContent>
        <IonText>
          <p>{name}</p>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default ImageCard;
