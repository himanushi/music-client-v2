import { IonCardContent, IonText } from "@ionic/react";
import { Maybe } from "graphql/types";
import React from "react";

const ImageCardItem = ({
  name,
  src,
  width,
}: {
  name: string;
  src?: Maybe<string>;
  width: number;
}) => {
  return (
    <>
      <img alt={name} style={{ width, height: width }} src={src || ""} />
      <IonCardContent style={{ padding: "5px 9px" }} className="ion-no-padding">
        <IonText>
          <p
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: 13,
            }}
          >
            {name}
          </p>
        </IonText>
      </IonCardContent>
    </>
  );
};

export default ImageCardItem;
