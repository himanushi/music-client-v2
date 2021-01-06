import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
} from "@ionic/react";
import DarkModeSwitch from "components/DarkModeSwitch";
import { personCircle } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";

const UserIcon = () => {
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const history = useHistory();

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
          <IonItem button onClick={() => console.dir(history)}>
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
export default UserIcon;
