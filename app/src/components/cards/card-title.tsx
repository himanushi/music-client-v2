import { IonCardContent, IonText } from "@ionic/react";
import React from "react";

const CardTitle = ({ title }: { title: string }) => {
  return (
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
          {title}
        </p>
      </IonText>
    </IonCardContent>
  );
};

export default CardTitle;
