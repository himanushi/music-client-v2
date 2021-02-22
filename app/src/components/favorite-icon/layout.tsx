/* eslint-disable @typescript-eslint/no-unused-expressions */
import { IonIcon } from "@ionic/react";
import Slot from "components/slot";
import { heart, heartOutline } from "ionicons/icons";
import React from "react";

type Props = {
  toggleFavorite: () => void;
};

export const Favorite = ({ toggleFavorite }: Props) => {
  const fontSize = 30;
  const itemFontSize = fontSize + 2;

  return (
    <div onClick={() => toggleFavorite()}>
      <Slot
        layout={<IonIcon style={{ fontSize }} color="danger" icon={heart} />}
        item={
          <IonIcon
            style={{ "--ionicon-stroke-width": "30px", fontSize: itemFontSize }}
            color="white"
            icon={heartOutline}
          />
        }
        center={true}
        left={-1}
        itemWidth={itemFontSize}
        itemHeight={itemFontSize}
      />
    </div>
  );
};

export const FavoriteOutline = ({ toggleFavorite }: Props) => {
  const fontSize = 30;

  return (
    <div onClick={() => toggleFavorite()}>
      <Slot
        layout={
          <IonIcon
            style={{ "--ionicon-stroke-width": "60px", fontSize }}
            color="medium"
            icon={heartOutline}
          />
        }
        item={
          <IonIcon
            style={{ "--ionicon-stroke-width": "20px", fontSize }}
            color="white"
            icon={heartOutline}
          />
        }
        top={0}
      />
    </div>
  );
};
