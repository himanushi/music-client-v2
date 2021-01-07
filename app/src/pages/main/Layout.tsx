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
import UserIcon from "components/userIcon/Component";
import { home, menu, play, playForward } from "ionicons/icons";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = (props) => {
  const headers = isPlatform("mobile") ? [] : [<MenuBar key={0} />];
  const footers = isPlatform("mobile")
    ? [<Player key={0} />, <MenuBar key={1} />]
    : [<Player key={0} />];

  return (
    <IonPage>
      <IonHeader>{headers}</IonHeader>
      <IonContent scrollX={false} scrollY={false} className="ion-no-padding">
        {props.children}
      </IonContent>
      <IonFooter>{footers}</IonFooter>
    </IonPage>
  );
};

const MenuBar: React.FC = React.memo(() => {
  return (
    <IonToolbar id="main-content">
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
  );
});

export const MenuList = React.memo(() => (
  <IonMenu content-id="main-content">
    <IonHeader>
      <IonToolbar color="main">
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent scrollX={false} scrollY={false}>
      <IonList>
        <IonListHeader>検索</IonListHeader>
        <IonMenuToggle auto-hide="false">
          <IonItem button routerLink="/albums">
            <IonIcon slot="start" icon={home}></IonIcon>
            <IonLabel>アルバム</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonList>
      <IonList>
        <IonListHeader>ユーザー</IonListHeader>
        <IonMenuToggle auto-hide="false">
          <IonItem button routerLink="/login">
            <IonIcon slot="start" icon={home}></IonIcon>
            <IonLabel>ログイン</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>
));

const Player: React.FC = React.memo(() => {
  return (
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
  );
});
