import { IonCard, IonRippleEffect } from "@ionic/react";
import ImageCardItem from "components/cards/ImageCardItem";
import React from "react";
import { useHistory } from "react-router";

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
  const history = useHistory();

  return (
    <IonCard
      className="ion-activatable ripple-parent"
      onClick={() => history.push(link)}
      style={{ width, cursor: "pointer" }}
    >
      <ImageCardItem name={name} src={src} width={width} />
      <IonRippleEffect></IonRippleEffect>
    </IonCard>
  );
};

export default ImageCardLink;
