import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
} from "@ionic/react";
import DarkModeSwitch from "components/dark-mode-switch";
import { CurrentUser } from "graphql/types";
import { personCircle } from "ionicons/icons";
import React, { useState } from "react";

type Props = {
  me: CurrentUser;
};

export const Layout: React.FC<Props> = ({ me }) => {
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  return (
    <>
      <IonPopover
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() =>
          setShowPopover({ showPopover: false, event: undefined })
        }
      >
        <IonList>
          <IonItem
            button
            routerLink="/login"
            onClick={() => {
              setShowPopover({ showPopover: false, event: undefined });
            }}
          >
            <IonLabel>ログイン</IonLabel>
          </IonItem>
          <IonItem lines="none">
            <DarkModeSwitch />
          </IonItem>
        </IonList>
      </IonPopover>
      <IonButton
        onClick={(e: any) => {
          e.persist();
          setShowPopover({ showPopover: true, event: e });
        }}
      >
        <IonIcon size="large" slot="icon-only" icon={personCircle}></IonIcon>
      </IonButton>
    </>
  );
};
