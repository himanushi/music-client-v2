import { Track } from "graphql/types";
import {
  PreviewPlayerMachine,
  PreviewPlayerState,
  PreviewPlayerStateEvent,
} from "machines/preview-player-machine";
import { Machine, SpawnedActorRef, State, assign, send, spawn } from "xstate";
import { sendParent } from "xstate/lib/actions";

export type MusicPlayerContext = {
  previewPlayerRef?: SpawnedActorRef<
    PreviewPlayerStateEvent,
    PreviewPlayerState
  >;
  track?: Track;
  duration: number;
  seek: number;
};

export type MusicPlayerSchema = {
  states: {
    idle: {};
    loading: {};
    playing: {};
    paused: {};
    stopped: {};
    finished: {};
  };
};

export type MusicPlayerEvent =
  | { type: "SET_TRACK"; track: Track }
  | { type: "SET_DURATION"; duration: number }
  | { type: "SET_SEEK"; seek: number }
  | { type: "CHANGE_SEEK"; seek: number }
  | { type: "LOAD" }
  | { type: "PLAY" }
  | { type: "PLAYING" }
  | { type: "PAUSE" }
  | { type: "PAUSED" }
  | { type: "STOP" }
  | { type: "STOPPED" }
  | { type: "FINISHED" }
  | { type: "TICK" };

export const MusicPlayerMachine = Machine<
  MusicPlayerContext,
  MusicPlayerSchema,
  MusicPlayerEvent
>(
  {
    id: "musicPlayer",
    initial: "idle",

    context: {
      track: undefined,
      duration: 0,
      seek: 0,
      previewPlayerRef: undefined,
    },

    states: {
      idle: {
        entry: ["initPlayers"],
      },

      loading: {
        on: {
          PLAYING: "playing",
        },
      },

      playing: {
        entry: [sendParent("PLAYING"), "setDuration"],
        invoke: {
          id: "seekTimer",
          src: (_) => (callback) => {
            const interval = setInterval(() => callback("TICK"), 1000);
            return () => {
              clearInterval(interval);
            };
          },
        },
        on: {
          PAUSE: { actions: ["pausePreview"] },
          PAUSED: "paused",
          FINISHED: "finished",
          TICK: { actions: ["tickPreview"] },
        },
      },

      paused: {
        entry: [sendParent("PAUSED")],
        on: {
          PLAY: { actions: ["playPreview"] },
          PLAYING: "playing",
        },
      },

      stopped: {
        entry: [sendParent("STOPPED")],
        on: {
          PLAY: { actions: ["playPreview"] },
          PLAYING: "playing",
        },
      },

      finished: {
        entry: ["resetSeek", sendParent("NEXT_PLAY")],
      },
    },
    on: {
      SET_TRACK: {
        actions: ["resetSeek", "setTrack", "setDuration", "setTrackToPreview"],
      },

      SET_SEEK: { actions: ["setSeek"] },

      STOP: { actions: ["stopPreview", "resetSeek"] },

      STOPPED: "stopped",

      LOAD: { actions: ["loadPreview"], target: "loading" },

      CHANGE_SEEK: { actions: ["changeSeek", "changeSeekPreview"] },
    },
  },
  {
    actions: {
      initPlayers: assign({
        previewPlayerRef: (_) => spawn(PreviewPlayerMachine, "preview"),
      }),

      setTrack: assign({
        track: (_, event) => ("track" in event ? event.track : undefined),
      }),

      setDuration: assign({
        duration: ({ track }) => {
          if (!track) return 0;
          if (track.durationMs > 30000) {
            return 30000;
          } else {
            return track.durationMs;
          }
        },
      }),

      setSeek: assign({
        seek: (_, event) => ("seek" in event ? event.seek : 0),
      }),

      resetSeek: assign({ seek: (_) => 0 }),

      changeSeek: assign({
        seek: (_, event) => ("seek" in event ? event.seek : 0),
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

      stopPreview: send("STOP", { to: "preview" }),

      tickPreview: send("TICK", { to: "preview" }),

      changeSeekPreview: send(
        (_, event) => {
          if ("seek" in event) {
            return { type: "CHANGE_SEEK", seek: event.seek };
          }
          return { type: "" };
        },
        { to: "preview" }
      ),
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
