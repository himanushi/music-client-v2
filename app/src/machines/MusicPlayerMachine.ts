import { Track } from "graphql/types";
import {
  PreviewPlayerMachine,
  PreviewPlayerState,
  PreviewPlayerStateEvent,
} from "machines/PreviewPlayerMachine";
import { Machine, SpawnedActorRef, State, assign, send, spawn } from "xstate";
import { sendParent } from "xstate/lib/actions";

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
    finished: {};
  };
};

export type MusicPlayerEvent =
  | { type: "SET_TRACK"; track: Track }
  | { type: "LOAD" }
  | { type: "PLAY" }
  | { type: "PLAYING" }
  | { type: "PAUSE" }
  | { type: "PAUSED" }
  | { type: "STOP" }
  | { type: "STOPPED" }
  | { type: "FINISHED" };

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

    states: {
      idle: {
        entry: ["initPlayers"],
      },

      loading: {
        on: {
          LOAD: { actions: ["loadPreview"] },
          PLAYING: "playing",
        },
      },

      playing: {
        entry: [sendParent("PLAYING")],
        on: {
          PAUSE: { actions: ["pausePreview"] },
          PAUSED: "paused",
          FINISHED: "finished",
        },
      },

      paused: {
        entry: [sendParent("PAUSED")],
        on: {
          PLAY: { actions: ["playPreview"] },
          PLAYING: "playing",
        },
      },

      finished: {
        entry: [sendParent("NEXT_PLAY")],
      },
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

      loadPreview: send("LOAD", { to: "preview" }),

      playPreview: send("PLAY", { to: "preview" }),

      pausePreview: send("PAUSE", { to: "preview" }),
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
