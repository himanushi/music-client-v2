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
import { useService } from "@xstate/react";
import { home, musicalNotes } from "ionicons/icons";
import { PlayerContext } from "machines/jukebox-machine";
import { Header } from "pages/header/page";
import { Player } from "pages/player/layout";
import { PlayerPage } from "pages/player/page";
import React, { memo, useContext, useState } from "react";

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
        <IonTitle>メニュー</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent scrollX={false} scrollY={false}>
      <IonList>
        <IonListHeader>検索</IonListHeader>
        <IonMenuToggle>
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
        <PlayerMenu />
        <IonMenuToggle>
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

const PlayerMenu = () => {
  const service = useContext(PlayerContext);
  const [state, send] = useService(service);
  const [open, setOpen] = useState(false);

  return (
    <>
      <IonMenuToggle>
        <IonItem button onClick={() => setOpen(true)}>
          <IonIcon slot="start" icon={musicalNotes}></IonIcon>
          <IonLabel>プレイヤー</IonLabel>
        </IonItem>
      </IonMenuToggle>
      <Player {...{ open, send, setOpen, state }} />
    </>
  );
};
