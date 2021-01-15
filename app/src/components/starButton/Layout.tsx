import { IonFabButton, IonIcon } from "@ionic/react";
import { star } from "ionicons/icons";
import React from "react";

export const Star = ({ size, active }: { size: string; active: boolean }) => {
  const color = active ? "star" : "nostar";
  return <IonIcon icon={star} size={size} color={color} />;
};

export const StarFabButton = ({
  size,
  active,
  onClick,
}: {
  size: string;
  active: boolean;
  onClick: (
    event: React.MouseEvent<HTMLIonFabButtonElement, MouseEvent>
  ) => void;
}) => {
  return (
    <IonFabButton
      className="ion-color"
      style={{ "--background": "#00000000" }}
      size="small"
      onClick={onClick}
    >
      <Star {...{ size, active }} />
    </IonFabButton>
  );
};
