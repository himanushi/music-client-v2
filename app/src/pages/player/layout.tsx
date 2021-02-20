/* eslint-disable max-lines-per-function */
import { ItemReorderEventDetail } from "@ionic/core";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonRange,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useActor } from "@xstate/react";
import ImageCard from "components/cards/image-card";
import SquareImage from "components/square-image";
import useDetailPageSize from "hooks/layouts/use-detail-page-size";
import {
  close,
  list,
  musicalNotes,
  pause,
  play,
  playBack,
  playForward,
  repeat,
} from "ionicons/icons";
import { JukeboxEvent, JukeboxState } from "machines/jukebox-machine";
import {
  MusicPlayerEvent,
  MusicPlayerState,
} from "machines/music-player-machine";
import React, { useState } from "react";
import { PayloadSender, SpawnedActorRef } from "xstate";

type PlayerStateProps = {
  state: JukeboxState;
  send: PayloadSender<JukeboxEvent>;
};

export const PlayerFooter: React.FC<PlayerStateProps> = ({ state, send }) => {
  const [open, setOpen] = useState(false);

  return (
    <IonToolbar style={{ height: 56 }} color="main">
      <Player {...{ open, send, setOpen, state }} />
      {!state.matches("idle") && (
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
      )}
      <IonText>
        <p
          style={{
            fontSize: 13,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {state.context.currentTrack?.name}
        </p>
      </IonText>
      <IonButtons slot="end">
        <IonButton
          onClick={() => send("PLAY_OR_PAUSE")}
          disabled={playerDisable(state)}
          fill="clear"
        >
          <IonIcon slot="icon-only" icon={playerIcon(state)} />
        </IonButton>
        <IonButton
          onClick={() => send("NEXT_PLAY")}
          disabled={playerDisable(state)}
          fill="clear"
        >
          <IonIcon slot="icon-only" icon={playForward} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

const playerDisable = (state: JukeboxState) =>
  ["idle", "loading"].some(state.matches);

const playerIcon = (state: JukeboxState) => {
  if (["playing"].some(state.matches)) {
    return pause;
  }
  return play;
};

type PlayerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & PlayerStateProps;

export const Player: React.FC<PlayerProps> = ({
  open,
  setOpen,
  state,
  send,
}: PlayerProps) => {
  const onClose = () => setOpen(false);
  const [displayNo, setDisplayNo] = useState(0);

  let display = <></>;
  if (displayNo === 0) display = <PlayerContent {...{ send, state }} />;
  if (displayNo === 1) display = <QueueContent {...{ send, state }} />;

  return (
    <IonModal onDidDismiss={onClose} isOpen={open}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{state.context.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
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

          <IonButtons slot="end">
            <IonButton
              color={state.context.repeat ? "primary" : "medium"}
              onClick={() => send("REPEAT")}
              fill="clear"
            >
              <IonIcon slot="icon-only" icon={repeat} />
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
      <IonGrid style={{ height: "100%" }}>
        <IonRow
          style={{ height: "100%" }}
          className="ion-justify-content-center ion-align-items-center"
        >
          <IonCol>
            <IonRow className="ion-justify-content-center ion-no-padding">
              <ImageCard
                name={state.context.currentTrack?.name || ""}
                src={state.context.currentTrack?.artworkL?.url || ""}
                width={imageCardWidth}
              />
            </IonRow>
            <IonRow className="ion-justify-content-center ion-no-padding">
              <IonLabel>{state.context.currentTrack?.name || ""}</IonLabel>
            </IonRow>
            <IonRow className="ion-justify-content-center ion-no-padding">
              <Seekbar {...{ send, state }} />
            </IonRow>
            <IonRow className="ion-justify-content-center ion-no-padding">
              <IonRow>
                <IonCol>
                  <IonButton
                    onClick={() => send("PREVIOUS_PLAY")}
                    disabled={playerDisable(state)}
                    fill="clear"
                  >
                    <IonIcon slot="icon-only" icon={playBack} />
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => send("PLAY_OR_PAUSE")}
                    disabled={playerDisable(state)}
                    fill="clear"
                  >
                    <IonIcon slot="icon-only" icon={playerIcon(state)} />
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => send("NEXT_PLAY")}
                    disabled={playerDisable(state)}
                    fill="clear"
                  >
                    <IonIcon slot="icon-only" icon={playForward} />
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

const Seekbar: React.FC<PlayerStateProps> = ({ state, send }) => {
  const [musicState, musicSend] = useActor(
    state.context.musicPlayerRef as SpawnedActorRef<
      MusicPlayerEvent,
      MusicPlayerState
    >
  );

  return (
    <IonRange
      max={musicState.context.duration}
      value={musicState.context.seek}
      mode="md"
      debounce={100}
      onIonChange={(event) => {
        const seek = event.detail.value as number;
        if (musicState.context.seek !== seek) {
          musicSend({ seek, type: "CHANGE_SEEK" });
        }
      }}
    >
      <IonLabel slot="start">{toMMSS(musicState.context.seek)}</IonLabel>
      <IonLabel slot="end">
        -{toMMSS(musicState.context.duration - musicState.context.seek)}
      </IonLabel>
    </IonRange>
  );
};

const toMMSS = (duration: number) => {
  const sec = Math.floor(duration / 1000);
  const minutes = Math.floor(sec / 60);
  const seconds = sec - minutes * 60;

  const padding = (num: number) => `0${num}`.slice(-2);

  return `${padding(minutes)}:${padding(seconds)}`;
};

const QueueContent: React.FC<PlayerStateProps> = ({ state, send }) => {
  const onIonItemReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    event.detail.complete();
  };

  return (
    <IonContent fullscreen scrollX={false} scrollY={false}>
      <IonContent className="ion-no-padding">
        <IonReorderGroup disabled={false} onIonItemReorder={onIonItemReorder}>
          {state.context.tracks.map((track, index) => (
            <IonItem key={index}>
              <IonButton
                onClick={() =>
                  send({
                    currentPlaybackNo: index,
                    type: "CHANGE_PLAYBACK_NO",
                  })
                }
                disabled={playerDisable(state)}
                fill="clear"
              >
                {state.context.currentPlaybackNo === index ? (
                  <IonIcon
                    slot="icon-only"
                    color="warning"
                    icon={musicalNotes}
                  />
                ) : (
                  <IonIcon slot="icon-only" icon={play} />
                )}
              </IonButton>
              <IonCard
                className="ion-no-padding ion-no-margin"
                style={{ height: 50, margin: "5px", width: 50 }}
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
          ))}
        </IonReorderGroup>
      </IonContent>
    </IonContent>
  );
};
