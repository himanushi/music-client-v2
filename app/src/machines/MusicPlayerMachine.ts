import { Track } from "graphql/types";
import {
  PreviewPlayerMachine,
  PreviewPlayerState,
  PreviewPlayerStateEvent,
} from "machines/PreviewPlayerMachine";
import { Machine, SpawnedActorRef, State, assign, send, spawn } from "xstate";
import { log, sendParent } from "xstate/lib/actions";

export type MusicPlayerContext = {
  previewPlayerRef?: SpawnedActorRef<
    PreviewPlayerStateEvent,
    PreviewPlayerState
  >;
};

export type MusicPlayerSchema = {
  states: {
    idle: {};
    loading: {};
    playing: {};
    paused: {};
    error: {};
    finished: {};
  };
};

export type MusicPlayerEvent =
  | { type: "SET_TRACK"; track: Track }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "STOP" }
  | { type: "LOADING" };

export const MusicPlayerMachine = Machine<
  MusicPlayerContext,
  MusicPlayerSchema,
  MusicPlayerEvent
>(
  {
    id: "musicPlayer",
    initial: "idle",

    context: {
      previewPlayerRef: undefined,
    },

    entry: "initPlayers",

    states: {
      idle: {},

      loading: {
        on: { PLAY: { actions: ["playPreview"], target: "playing" } },
        exit: sendParent("PLAY"),
      },

      playing: {},

      paused: {},

      error: {},

      finished: {},
    },
    on: {
      SET_TRACK: {
        actions: ["setTrackToPreview"],
        target: "loading",
      },
    },
  },
  {
    actions: {
      initPlayers: assign({
        previewPlayerRef: (_) => spawn(PreviewPlayerMachine, "preview"),
      }),

      ///////// PreviewPlayer /////////
      setTrackToPreview: send(
        (_, event) =>
          "track" in event
            ? { type: "SET_TRACK", track: event.track }
            : { type: "" },
        { to: "preview" }
      ),

      playPreview: send("PLAY", { to: "preview" }),

      stop: log(),
    },
  }
);

export type MusicPlayerState = State<
  MusicPlayerContext,
  MusicPlayerEvent,
  MusicPlayerSchema,
  {
    value: any;
    context: MusicPlayerContext;
  }
>;
