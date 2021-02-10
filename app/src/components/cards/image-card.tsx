import { IonCard } from "@ionic/react";
import SquareImage from "components/square-image";
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
    <IonCard style={{ width, height: width }}>
      <SquareImage name={name} src={src} width={width} />
    </IonCard>
  );
};

export default ImageCard;
