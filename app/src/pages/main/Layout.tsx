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
} from "@ionic/react";
import { home, play, playForward } from "ionicons/icons";
import Header from "pages/header/Page";
import React, { memo, useMemo } from "react";

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = (props) => {
  const player = useMemo(() => {
    return <Player key="player" />;
  }, []);
  const footers = player;

  return (
    <IonPage>
      <Header />
      <IonContent scrollX={false} scrollY={false} className="ion-no-padding">
        {props.children}
      </IonContent>
      <MemoizedFooter>{footers}</MemoizedFooter>
    </IonPage>
  );
};

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

const Player: React.FC = () => {
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
};
