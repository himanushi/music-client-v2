import { IonCard } from "@ionic/react";
import ImageCardItem from "components/cards/ImageCardItem";
import React from "react";

const ImageCardLink = ({
  name,
  src,
  link,
  width,
}: {
  name: string;
  src?: string;
  link: string;
  width: number;
}) => {
  return (
    <IonCard button routerLink={link} style={{ width }}>
      <ImageCardItem name={name} src={src} width={width} />
    </IonCard>
  );
};

export default ImageCardLink;
