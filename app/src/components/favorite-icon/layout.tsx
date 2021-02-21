import { FetchResult, MutationFunctionOptions } from "@apollo/client";
import { IonIcon } from "@ionic/react";
import Slot from "components/slot";
import { TData, TVariables } from "hooks/models/use-favorite-mutation";
import { star, starOutline } from "ionicons/icons";
import React from "react";

type Props = {
  id: string;
  changeFavorite: (
    options?: MutationFunctionOptions<TData, TVariables> | undefined
  ) => Promise<FetchResult<TData, Record<string, any>, Record<string, any>>>;
};

export const Favorite = ({ id, changeFavorite }: Props) => {
  const fontSize = 26;
  const itemFontSize = fontSize + 2;

  return (
    <div
      onClick={(event) => {
        changeFavorite({
          variables: { input: { albumIds: [id], favorite: false } },
        });
        // Event.preventDefault();
      }}
    >
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
    </div>
  );
};

export const FavoriteOutline = ({ id, changeFavorite }: Props) => {
  const fontSize = 26;

  return (
    <div
      onClick={(event) => {
        changeFavorite({
          variables: { input: { albumIds: [id], favorite: true } },
        });
        // Event.preventDefault();
      }}
    >
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
    </div>
  );
};
