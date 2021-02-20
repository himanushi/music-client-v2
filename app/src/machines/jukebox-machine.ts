import { Track } from "graphql/types";
import {
  MusicPlayerEvent,
  MusicPlayerMachine,
  MusicPlayerState,
} from "machines/music-player-machine";
import React from "react";
import {
  Machine as machine,
  SpawnedActorRef,
  State,
  assign,
  interpret,
  send,
  spawn,
} from "xstate";

export type JukeboxContext = {
  name: string;
  currentPlaybackNo: number;
  tracks: readonly Track[];
  currentTrack?: Track;
  repeat: boolean;
  musicPlayerRef?: SpawnedActorRef<MusicPlayerEvent, MusicPlayerState>;
};

export type JukeboxSchema = {
  states: {
    idle: {};
    loading: {};
    playing: {};
    paused: {};
    stopped: {};
  };
};

export type JukeboxEvent =
  // Queue
  | { type: "SET_NAME"; name: string }
  | {
      type: "REPLACE_AND_PLAY";
      tracks: JukeboxContext["tracks"];
      currentPlaybackNo: JukeboxContext["currentPlaybackNo"];
    }
  | { type: "SHUFFLE" }
  // Player
  | { type: "PLAY" }
  | { type: "PLAY_OR_PAUSE" }
  | { type: "CHANGE_PLAYBACK_NO"; currentPlaybackNo: number }
  | { type: "NEXT_PLAY" }
  | { type: "PREVIOUS_PLAY" }
  | { type: "PLAYING" }
  | { type: "PAUSE" }
  | { type: "PAUSED" }
  | { type: "STOP" }
  | { type: "STOPPED" }
  | { type: "REPEAT" };

export const JukeboxMachine = machine<
  JukeboxContext,
  JukeboxSchema,
  JukeboxEvent
>(
  {
    context: {
      currentPlaybackNo: 0,
      musicPlayerRef: undefined,
      name: "",
      repeat: false,
      tracks: [],
    },

    id: "jukebox",

    initial: "idle",

    invoke: {
      id: "mediaController",
      src: (_) => (callback) => {
        if (navigator.mediaSession) {
          navigator.mediaSession.setActionHandler("play", () =>
            callback({ type: "PLAY" })
          );
          navigator.mediaSession.setActionHandler("pause", () =>
            callback({ type: "PAUSE" })
          );
          navigator.mediaSession.setActionHandler("nexttrack", () =>
            callback({ type: "NEXT_PLAY" })
          );
          navigator.mediaSession.setActionHandler("previoustrack", () =>
            callback({ type: "PREVIOUS_PLAY" })
          );
        }
      },
    },

    on: {
      CHANGE_PLAYBACK_NO: {
        actions: ["changePlaybackNo", "changeCurrentTrack"],
        target: "loading",
      },

      NEXT_PLAY: [
        {
          actions: ["nextPlaybackNo", "changeCurrentTrack"],
          cond: "canNextPlay",
          target: "loading",
        },
        {
          actions: ["nextPlaybackNo", "changeCurrentTrack", "stop", "setTrack"],
        },
      ],

      PREVIOUS_PLAY: [
        {
          actions: ["previousPlaybackNo", "changeCurrentTrack"],
          cond: "canPreviousPlay",
          target: "loading",
        },
        {
          actions: [
            "previousPlaybackNo",
            "changeCurrentTrack",
            "stop",
            "setTrack",
          ],
        },
      ],

      REPEAT: { actions: ["repeat"] },

      REPLACE_AND_PLAY: {
        actions: ["replaceTracks", "changePlaybackNo", "changeCurrentTrack"],
        target: "loading",
      },

      SET_NAME: { actions: ["setName"] },

      STOPPED: "stopped",
    },

    states: {
      idle: {
        entry: ["initMusicPlayer"],
      },

      loading: {
        entry: ["setTrack", "load"],
        on: {
          PLAYING: "playing",
        },
      },

      paused: {
        on: {
          PLAY: { actions: ["play"] },
          PLAYING: "playing",
          PLAY_OR_PAUSE: { actions: ["play"] },
        },
      },

      playing: {
        entry: ["setMediaMetadata"],
        on: {
          PAUSE: { actions: ["pause"] },
          PAUSED: "paused",
          PLAY_OR_PAUSE: { actions: ["pause"] },
        },
      },

      stopped: {
        on: {
          PLAY: { actions: ["play"] },
          PLAYING: "playing",
          PLAY_OR_PAUSE: { actions: ["play"] },
        },
      },
    },
  },
  {
    actions: {
      changeCurrentTrack: assign(({ tracks, currentPlaybackNo }) => ({
        currentTrack: tracks[currentPlaybackNo],
      })),

      changePlaybackNo: assign((_, event) => {
        if (!("currentPlaybackNo" in event)) return {};
        return { currentPlaybackNo: event.currentPlaybackNo };
      }),

      initMusicPlayer: assign({
        musicPlayerRef: (_) => spawn(MusicPlayerMachine, "musicPlayer"),
      }),

      load: send("LOAD", { to: "musicPlayer" }),

      nextPlaybackNo: assign({
        currentPlaybackNo: ({ tracks, currentPlaybackNo }) => {
          if (currentPlaybackNo + 1 === tracks.length) return 0;
          return currentPlaybackNo + 1;
        },
      }),

      pause: send("PAUSE", { to: "musicPlayer" }),

      play: send("PLAY", { to: "musicPlayer" }),

      previousPlaybackNo: assign({
        currentPlaybackNo: ({ currentPlaybackNo }) => {
          if (currentPlaybackNo === 0) return 0;
          return currentPlaybackNo - 1;
        },
      }),

      repeat: assign({ repeat: ({ repeat }) => !repeat }),

      replaceTracks: assign({
        tracks: (_, event) => ("tracks" in event ? event.tracks : []),
      }),

      setMediaMetadata: ({ currentTrack }) => {
        if (navigator.mediaSession) {
          if (currentTrack) {
            navigator.mediaSession.metadata = new MediaMetadata({
              artwork: [
                {
                  sizes: "300x300",
                  src: currentTrack.artworkM.url || "",
                  type: "image/png",
                },
              ],
              title: currentTrack.name,
            });
          }
        }
      },

      setName: assign({
        name: (_, event) => ("name" in event ? event.name : ""),
      }),

      setTrack: send(
        ({ currentTrack }) => ({ track: currentTrack, type: "SET_TRACK" }),
        { to: "musicPlayer" }
      ),

      stop: send("STOP", { to: "musicPlayer" }),
    },

    guards: {
      canNextPlay: ({ repeat, tracks, currentPlaybackNo }) =>
        repeat || currentPlaybackNo + 1 !== tracks.length,
      canPreviousPlay: ({ currentPlaybackNo }) => currentPlaybackNo !== 0,
    },
  }
);

export type JukeboxState = State<
  JukeboxContext,
  JukeboxEvent,
  JukeboxSchema,
  {
    value: any;
    context: JukeboxContext;
  }
>;

// Inspect({ iframe: false });

export const playerService = interpret(JukeboxMachine, {
  devTools: process.env.NODE_ENV === "development",
}).start();

export type PlayerService = typeof playerService;

export const PlayerContext = React.createContext<PlayerService>(playerService);
