import { IonIcon } from "@ionic/react";
import Slot from "components/slot";
import { star, starOutline } from "ionicons/icons";
import React from "react";

export const Favorite = ({ id }: { id: string }) => {
  const fontSize = 26;
  const itemFontSize = fontSize + 2;

  return (
    <Slot
      layout={<IonIcon style={{ fontSize }} color="warning" icon={star} />}
      item={
        <IonIcon
          style={{ "--ionicon-stroke-width": "20px", fontSize: itemFontSize }}
          color="black"
          icon={starOutline}
        />
      }
      center={true}
      left={-1}
      itemWidth={itemFontSize}
      itemHeight={itemFontSize}
    />
  );
};

export const FavoriteOutline = () => {
  const fontSize = 26;

  return (
    <Slot
      layout={
        <IonIcon
          style={{ "--ionicon-stroke-width": "60px", fontSize }}
          color="medium"
          icon={starOutline}
        />
      }
      item={
        <IonIcon
          style={{ "--ionicon-stroke-width": "20px", fontSize }}
          color="white"
          icon={starOutline}
        />
      }
      top={0}
    />
  );
};
