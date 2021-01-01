import {
  IonButton,
  IonButtons,
  IonFooter,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { play, playForward } from "ionicons/icons";
import React from "react";

const FooterPlayer = () => {
  return (
    <IonFooter>
      <IonToolbar color="main">
        <IonButtons slot="end">
          <IonButton>
            <IonIcon slot="icon-only" icon={play} />
          </IonButton>
          <IonButton>
            <IonIcon slot="icon-only" icon={playForward} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonFooter>
  );
};

export default FooterPlayer;
