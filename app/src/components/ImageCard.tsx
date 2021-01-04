import { IonCard, IonCardContent, IonImg, IonText } from "@ionic/react";
import { Maybe } from "graphql/types";
import React, { useMemo } from "react";

const ImageCard = ({
  name,
  url,
  width,
}: {
  name: string;
  url: Maybe<string>;
  width: number;
}) => {
  return useMemo(
    () => (
      <IonCard className="ion-no-margin" style={{ width }}>
        <IonImg style={{ width, height: width }} src={url || ""} />
        <IonCardContent>
          <IonText
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width,
            }}
          >
            {name}
          </IonText>
        </IonCardContent>
      </IonCard>
    ),
    [name, url, width]
  );
};

export default ImageCard;
