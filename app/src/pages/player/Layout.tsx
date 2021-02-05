import { ItemReorderEventDetail } from "@ionic/core";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import ImageCard from "components/cards/ImageCard";
import SquareImage from "components/SquareImage";
import useDetailPageSize from "hooks/layouts/useDetailPageSize";
import {
  cafe,
  close,
  list,
  musicalNotes,
  pause,
  play,
  playForward,
} from "ionicons/icons";
import { PlayerService } from "machines/JukeboxMachine";
import React, { useState } from "react";

type PlayerStateProps = {
  service: PlayerService;
};

export const PlayerFooter: React.FC<PlayerStateProps> = ({ service }) => {
  const [open, setOpen] = useState(false);

  return (
    <IonToolbar style={{ height: 56 }} color="main">
      <Player {...{ open, setOpen, service }} />
      <IonButtons slot="start">
        <IonButton
          disabled={service.state.matches("idle")}
          style={{ height: 50 }}
          onClick={() => setOpen(true)}
        >
          <ImageCard
            name={service.state.context.currentTrack?.name || ""}
            src={service.state.context.currentTrack?.artworkL?.url || undefined}
            width={50}
          />
        </IonButton>
      </IonButtons>
      <IonText>
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 13,
          }}
        >
          {service.state.context.currentTrack?.name}
        </p>
      </IonText>
      <IonButtons slot="end">
        <FooterPlayButton {...{ service }} />
        <IonButton>
          <IonIcon slot="icon-only" icon={playForward} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

const FooterPlayButton: React.FC<PlayerStateProps> = ({ service }) => {
  let button = <></>;
  if (service.state.matches("idle")) {
    button = (
      <IonButton disabled={true}>
        <IonIcon slot="icon-only" icon={play} />
      </IonButton>
    );
  } else if (service.state.matches("loading")) {
    button = (
      <IonButton disabled={true}>
        <IonIcon slot="icon-only" icon={cafe} />
      </IonButton>
    );
  } else if (service.state.matches("playing")) {
    button = (
      <IonButton disabled={false}>
        <IonIcon slot="icon-only" icon={pause} />
      </IonButton>
    );
  } else {
    button = (
      <IonButton disabled={false}>
        <IonIcon slot="icon-only" icon={play} />
      </IonButton>
    );
  }

  return button;
};

type PlayerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & PlayerStateProps;

const Player: React.FC<PlayerProps> = ({
  open,
  setOpen,
  service,
}: PlayerProps) => {
  const onClose = () => setOpen(false);
  const [displayNo, setDisplayNo] = useState(0);

  let display = <></>;
  if (displayNo === 0) display = <PlayerContent {...{ service }} />;
  if (displayNo === 1) display = <QueueContent {...{ service }} />;

  return (
    <IonModal onDidDismiss={onClose} isOpen={open}>
      {display}
      <IonFooter>
        <IonToolbar color="main">
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
            <IonButton onClick={() => setDisplayNo(0)}>
              <IonIcon icon={musicalNotes} />
            </IonButton>
            <IonButton onClick={() => setDisplayNo(1)}>
              <IonIcon icon={list} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

const PlayerContent: React.FC<PlayerStateProps> = ({ service }) => {
  const { imageCardWidth } = useDetailPageSize();

  return (
    <IonContent fullscreen scrollX={false} scrollY={false}>
      <IonGrid>
        <IonRow className="ion-justify-content-center ion-no-padding">
          <ImageCard
            name={service.state.context.currentTrack?.name || ""}
            src={service.state.context.currentTrack?.artworkL?.url || ""}
            width={imageCardWidth}
          />
        </IonRow>
        <IonRow className="ion-justify-content-center ion-no-padding">
          <IonButton shape="round">
            <IonIcon icon={play} />
          </IonButton>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

const QueueContent: React.FC<PlayerStateProps> = ({ service }) => {
  const onIonItemReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    console.log(event.detail);
    event.detail.complete();
  };

  return (
    <IonContent fullscreen scrollX={false}>
      <IonReorderGroup disabled={false} onIonItemReorder={onIonItemReorder}>
        {service.state.context.tracks.map((track, index) => {
          return (
            <IonItem key={index}>
              <IonCard
                className="ion-no-padding ion-no-margin"
                style={{ width: 50, height: 50, margin: "5px" }}
              >
                <SquareImage
                  width={50}
                  name={track.name || ""}
                  src={track.artworkL?.url || undefined}
                />
              </IonCard>
              <IonLabel>{track.name}</IonLabel>
              <IonReorder slot="end" />
            </IonItem>
          );
        })}
      </IonReorderGroup>
    </IonContent>
  );
};
