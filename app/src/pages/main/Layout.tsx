import {
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
} from "@ionic/react";
import { home } from "ionicons/icons";
import { Header } from "pages/header/Page";
import { PlayerPage } from "pages/player/Page";
import React, { memo } from "react";

type Props = {
  header?: JSX.Element;
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = (props) => (
  <IonPage>
    <Header>{props.header}</Header>
    <IonContent scrollX={false} scrollY={false} className="ion-no-padding">
      {props.children}
    </IonContent>
    <MemoizedFooter>
      <PlayerPage />
    </MemoizedFooter>
  </IonPage>
);

const Footer: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <IonFooter>{children}</IonFooter>
);
const MemoizedFooter = memo(Footer);

export const MenuList = () => (
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
          <IonItem button routerLink="/artists">
            <IonIcon slot="start" icon={home}></IonIcon>
            <IonLabel>アーティスト</IonLabel>
          </IonItem>
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
);
export const MemorizedMenuList = memo(MenuList);
