import {
  IonButton,
  IonButtons,
  IonFooter,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { playSkipBackSharp } from "ionicons/icons";
import React from "react";

const FooterPlayer = () => {
  return (
    <IonFooter>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton>
            <IonIcon slot="icon-only" icon={playSkipBackSharp} />
          </IonButton>
        </IonButtons>

        <IonButtons slot="end">
          <IonButton>
            <IonIcon slot="icon-only" icon={playSkipBackSharp} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonFooter>
  );
};

export default FooterPlayer;
