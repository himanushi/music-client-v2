import { ItemReorderEventDetail } from "@ionic/core";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonReorder,
  IonReorderGroup,
  IonText,
  IonToolbar,
} from "@ionic/react";
import ImageCard from "components/cards/ImageCard";
import SquareImage from "components/SquareImage";
import { close, pause, play, playForward } from "ionicons/icons";
import { PlayerState, PlayerStateEvent } from "machines/PlayerMachine";
import React, { useState } from "react";
import { PayloadSender } from "xstate";

type PlayerStateProps = {
  state: PlayerState;
  send: PayloadSender<PlayerStateEvent>;
};

export const PlayerFooter: React.FC<PlayerStateProps> = ({ state, send }) => {
  const [open, setOpen] = useState(false);

  return (
    <IonToolbar color="main">
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
        <PlayButton {...{ state, send }} />
        <IonButton>
          <IonIcon slot="icon-only" icon={playForward} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

const PlayButton: React.FC<PlayerStateProps> = ({ state, send }) => {
  let button = <></>;
  if (state.matches("idle")) {
    button = (
      <IonButton disabled={true}>
        <IonIcon slot="icon-only" icon={play} />
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

  return (
    <IonModal onDidDismiss={onClose} isOpen={open}>
      <PlayerContent {...{ state, send }} />
      <IonFooter>
        <IonToolbar color="main">
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

const PlayerContent: React.FC<PlayerStateProps> = ({ state, send }) => {
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
