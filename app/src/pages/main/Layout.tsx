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
import React, { memo, useMemo } from "react";

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = (props) => {
  const menuBar = useMemo(function menuBar() {
    return <MenuBar key="menuBar" />;
  }, []);
  const player = useMemo(function player() {
    return <Player key="player" />;
  }, []);
  const headers = isPlatform("mobile") ? <></> : menuBar;
  const footers = isPlatform("mobile") ? (
    <>
      {player}
      {menuBar}
    </>
  ) : (
    player
  );

  return (
    <IonPage>
      <MemoizedHeader>{headers}</MemoizedHeader>
      <IonContent scrollX={false} scrollY={false} className="ion-no-padding">
        {props.children}
      </IonContent>
      <MemoizedFooter>{footers}</MemoizedFooter>
    </IonPage>
  );
};

const Header: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <IonHeader>{children}</IonHeader>
);
const MemoizedHeader = memo(Header);

const Footer: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <IonFooter>{children}</IonFooter>
);
const MemoizedFooter = memo(Footer);

const MenuBar: React.FC = () => {
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
};

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
