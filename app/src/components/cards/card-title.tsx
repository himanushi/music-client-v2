import { IonCardContent, IonText } from "@ionic/react";
import React from "react";

const CardTitle = ({ title }: { title: string }) => (
  <IonCardContent style={{ padding: "5px 9px" }} className="ion-no-padding">
    <IonText>
      <p
        style={{
          fontSize: 13,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </p>
    </IonText>
  </IonCardContent>
);

export default CardTitle;
