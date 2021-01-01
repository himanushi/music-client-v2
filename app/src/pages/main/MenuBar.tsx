import {
  IonButton,
  IonButtons,
  IonFooter,
  IonHeader,
  IonIcon,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { isPlatform } from "@ionic/react";
import { menu } from "ionicons/icons";
import React from "react";

import DarkModeSwitch from "./DarkModeSwitch";

const MenuBar: React.FC = () => {
  const PositionRef = isPlatform("mobile") ? IonFooter : IonHeader;

  return (
    <PositionRef id="main-content">
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuToggle>
            <IonButton>
              <IonIcon slot="icon-only" icon={menu}></IonIcon>
            </IonButton>
          </IonMenuToggle>
        </IonButtons>
        <IonTitle>ゲーム音楽</IonTitle>
        <IonButtons slot="end">
          <DarkModeSwitch />
        </IonButtons>
      </IonToolbar>
    </PositionRef>
  );
};

export default MenuBar;
