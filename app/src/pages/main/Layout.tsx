import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { home, menu, play, playForward } from "ionicons/icons";
import UserIcon from "pages/parts/UserIcon";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = (props) => {
  return (
    <IonPage>
      <FooterPlayer />
      <MenuBar />
      <MenuList />
      {props.children}
    </IonPage>
  );
};

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
          <UserIcon />
        </IonButtons>
      </IonToolbar>
    </PositionRef>
  );
};

const MenuList = React.memo(() => (
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
));

const FooterPlayer: React.FC = () => {
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
