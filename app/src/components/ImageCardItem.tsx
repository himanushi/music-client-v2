import { IonCard, IonCardContent, IonImg, IonText } from "@ionic/react";
import { Maybe } from "graphql/types";
import React from "react";

const ImageCardItem = ({
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
      <IonImg alt={name} style={{ width, height: width }} src={url || ""} />
      <IonCardContent style={{ padding: "5px 9px" }} className="ion-no-padding">
        <IonText>
          <p
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: 12,
            }}
          >
            {name}
          </p>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default ImageCardItem;
