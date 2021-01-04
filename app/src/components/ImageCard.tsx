import { IonCard, IonCardContent, IonImg, IonText } from "@ionic/react";
import { Maybe } from "graphql/types";
import React from "react";

const ImageCard = ({
  name,
  url,
  width,
}: {
  name: string;
  url?: Maybe<string>;
  width: number;
}) => {
  return (
    <IonCard style={{ width }}>
      <IonImg style={{ width, height: width }} src={url || ""} />
      <IonCardContent>
        <IonText style={{ width }}>{name}</IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default ImageCard;
