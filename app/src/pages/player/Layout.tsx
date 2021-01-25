import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonModal,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ImageCard from "components/cards/ImageCard";
import useDetailPageSize from "hooks/layouts/useDetailPageSize";
import { close, play, playForward } from "ionicons/icons";
import React, { useState } from "react";

export const PlayerFooter: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <IonToolbar color="main">
      <Player {...{ open, setOpen }} />
      <IonButtons slot="end">
        <IonButton>
          <IonIcon slot="icon-only" icon={play} />
        </IonButton>
        <IonButton>
          <IonIcon slot="icon-only" icon={playForward} />
        </IonButton>
        <IonButton onClick={() => setOpen(true)}>Player</IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

type PlayerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Player: React.FC<PlayerProps> = ({ open, setOpen }: PlayerProps) => {
  const { imageCardWidth } = useDetailPageSize();
  const onClose = () => setOpen(false);

  return (
    <IonModal onDidDismiss={onClose} isOpen={open}>
      <IonContent fullscreen>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <ImageCard
              width={imageCardWidth}
              name="ff"
              src="https://is1-ssl.mzstatic.com/image/thumb/Music62/v4/4f/4f/3b/4f4f3bff-1a66-876e-aec6-55226c9d88d2/woff_H1.jpg/640x640bb.jpeg"
            />
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar color="main">
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};
