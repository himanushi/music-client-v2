import { IonCard } from "@ionic/react";
import ImageCardItem from "components/cards/ImageCardItem";
import React from "react";

const ImageCard = ({
  name,
  src,
  width,
}: {
  name: string;
  src?: string;
  width: number;
}) => {
  return (
    <IonCard style={{ width }}>
      <ImageCardItem name={name} src={src} width={width} />
    </IonCard>
  );
};

export default ImageCard;
