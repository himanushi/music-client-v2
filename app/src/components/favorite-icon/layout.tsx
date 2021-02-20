import { IonIcon } from "@ionic/react";
import Slot from "components/slot";
import { star, starOutline } from "ionicons/icons";
import React from "react";

export const Favorite = ({ id }: { id: string }) => (
  <IonIcon style={{ fontSize: 25 }} color="favorite" icon={star} />
);

export const FavoriteOutline = () => {
  const fontSize = 26;

  return (
    <Slot
      layout={
        <IonIcon
          className="ion-no-padding"
          style={{ "--ionicon-stroke-width": "60px", fontSize }}
          color="medium"
          icon={starOutline}
        />
      }
      item={
        <IonIcon
          className="ion-no-padding"
          style={{ "--ionicon-stroke-width": "20px", fontSize }}
          color="white"
          icon={starOutline}
        />
      }
      top={0}
    />
  );
};
