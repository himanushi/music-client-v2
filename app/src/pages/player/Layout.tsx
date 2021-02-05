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
import { JukeboxEvent, JukeboxState } from "machines/JukeboxMachine";
import React, { useState } from "react";
import { PayloadSender } from "xstate";

type PlayerStateProps = {
  state: JukeboxState;
  send: PayloadSender<JukeboxEvent>;
};

export const PlayerFooter: React.FC<PlayerStateProps> = ({ state, send }) => {
  const [open, setOpen] = useState(false);

  return (
    <IonToolbar style={{ height: 56 }} color="main">
      <Player {...{ open, setOpen, state, send }} />
      <IonButtons slot="start">
        <IonButton
          disabled={state.matches("idle")}
          style={{ height: 50 }}
          onClick={() => setOpen(true)}
        >
          <ImageCard
            name={state.context.currentTrack?.name || ""}
            src={state.context.currentTrack?.artworkL?.url || undefined}
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
          {state.context.currentTrack?.name}
        </p>
      </IonText>
      <IonButtons slot="end">
        <FooterPlayButton {...{ state, send }} />
        <IonButton>
          <IonIcon slot="icon-only" icon={playForward} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

const FooterPlayButton: React.FC<PlayerStateProps> = ({ state, send }) => {
  let button = <></>;
  if (state.matches("idle")) {
    button = (
      <IonButton disabled={true}>
        <IonIcon slot="icon-only" icon={play} />
      </IonButton>
    );
  } else if (state.matches("loading")) {
    button = (
      <IonButton disabled={true}>
        <IonIcon slot="icon-only" icon={cafe} />
      </IonButton>
    );
  } else if (state.matches("playing")) {
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
  state,
  send,
}: PlayerProps) => {
  const onClose = () => setOpen(false);
  const [displayNo, setDisplayNo] = useState(0);

  let display = <></>;
  if (displayNo === 0) display = <PlayerContent {...{ state, send }} />;
  if (displayNo === 1) display = <QueueContent {...{ state, send }} />;

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

const PlayerContent: React.FC<PlayerStateProps> = ({ state, send }) => {
  const { imageCardWidth } = useDetailPageSize();

  return (
    <IonContent fullscreen scrollX={false} scrollY={false}>
      <IonGrid>
        <IonRow className="ion-justify-content-center ion-no-padding">
          <ImageCard
            name={state.context.currentTrack?.name || ""}
            src={state.context.currentTrack?.artworkL?.url || ""}
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

const QueueContent: React.FC<PlayerStateProps> = ({ state, send }) => {
  const onIonItemReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    console.log(event.detail);
    event.detail.complete();
  };

  return (
    <IonContent fullscreen scrollX={false}>
      <IonReorderGroup disabled={false} onIonItemReorder={onIonItemReorder}>
        {state.context.tracks.map((track, index) => {
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
