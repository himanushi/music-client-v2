import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { home } from "ionicons/icons";
import React from "react";

const MenuList: React.FC = () => (
  <IonMenu content-id="main-content">
    <IonHeader>
      <IonToolbar color="main">
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent scrollX={false} scrollY={false}>
      <IonList>
        <IonListHeader>Navigate</IonListHeader>
        <IonMenuToggle auto-hide="false">
          <IonItem button>
            <IonIcon slot="start" icon={home}></IonIcon>
            <IonLabel>Home</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>
);

export default MenuList;
