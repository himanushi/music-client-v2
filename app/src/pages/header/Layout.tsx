import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import UserIcon from "components/userIcon/Component";
import { menu } from "ionicons/icons";
import React, { memo } from "react";

type Props = {
  children?: React.ReactNode;
};

const Header: React.FC<Props> = ({ children }) => (
  <IonHeader>{children}</IonHeader>
);
export const MemoizedHeader = memo(Header);

export const MenuBar: React.FC<Props> = (props) => {
  return (
    <IonToolbar id="main-content">
      <IonButtons slot="start">
        <IonMenuToggle>
          <IonButton>
            <IonIcon slot="icon-only" icon={menu}></IonIcon>
          </IonButton>
        </IonMenuToggle>
      </IonButtons>
      <Title />
      <IonButtons slot="end">
        <UserIcon />
      </IonButtons>
    </IonToolbar>
  );
};

export const Title: React.FC = () => <IonTitle>ゲーム音楽</IonTitle>;
