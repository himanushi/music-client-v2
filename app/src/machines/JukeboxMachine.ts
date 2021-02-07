import { inspect } from "@xstate/inspect";
import { Track } from "graphql/types";
import {
  MusicPlayerEvent,
  MusicPlayerMachine,
  MusicPlayerState,
} from "machines/MusicPlayerMachine";
import React from "react";
import {
  Machine,
  SpawnedActorRef,
  State,
  assign,
  interpret,
  send,
  spawn,
} from "xstate";

export type JukeboxContext = {
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
  | {
      type: "REPLACE_AND_PLAY";
      tracks: JukeboxContext["tracks"];
      currentPlaybackNo: JukeboxContext["currentPlaybackNo"];
    }
  | { type: "SHUFFLE" }
  // Player
  | { type: "PLAY" }
  | { type: "PLAY_OR_PAUSE" }
  | { type: "NEXT_PLAY" }
  | { type: "PREVIOUS_PLAY" }
  | { type: "PLAYING" }
  | { type: "PAUSE" }
  | { type: "PAUSED" }
  | { type: "STOP" }
  | { type: "STOPPED" };

export const JukeboxMachine = Machine<
  JukeboxContext,
  JukeboxSchema,
  JukeboxEvent
>(
  {
    id: "jukebox",
    initial: "idle",

    context: {
      currentPlaybackNo: 0,
      tracks: [],
      repeat: false,
      musicPlayerRef: undefined,
    },

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
        return () => {};
      },
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

      playing: {
        entry: ["setMediaMetadata"],
        on: {
          PLAY_OR_PAUSE: { actions: ["pause"] },
          PAUSE: { actions: ["pause"] },
          PAUSED: "paused",
        },
      },

      paused: {
        on: {
          PLAY_OR_PAUSE: { actions: ["play"] },
          PLAY: { actions: ["play"] },
          PLAYING: "playing",
        },
      },

      stopped: {},
    },

    on: {
      REPLACE_AND_PLAY: {
        actions: ["replaceTracks", "changePlaybackNo", "changeCurrentTrack"],
        target: "loading",
      },

      NEXT_PLAY: [
        {
          cond: "canNextPlay",
          target: "loading",
          actions: ["nextPlaybackNo", "changeCurrentTrack"],
        },
        {
          target: "stopped",
          actions: ["nextPlaybackNo", "changeCurrentTrack"],
        },
      ],

      PREVIOUS_PLAY: [
        {
          cond: "canPreviousPlay",
          target: "loading",
          actions: ["previousPlaybackNo", "changeCurrentTrack"],
        },
        {
          target: "stopped",
          actions: ["previousPlaybackNo", "changeCurrentTrack"],
        },
      ],
    },
  },
  {
    actions: {
      initMusicPlayer: assign({
        musicPlayerRef: (_) => spawn(MusicPlayerMachine, "musicPlayer"),
      }),

      replaceTracks: assign({
        tracks: (_, event) => ("tracks" in event ? event.tracks : []),
      }),

      changePlaybackNo: assign((_, event) => {
        if (!("currentPlaybackNo" in event)) return {};
        return { currentPlaybackNo: event.currentPlaybackNo };
      }),

      nextPlaybackNo: assign({
        currentPlaybackNo: ({ tracks, currentPlaybackNo }) => {
          if (currentPlaybackNo + 1 === tracks.length) return 0;
          return currentPlaybackNo + 1;
        },
      }),

      previousPlaybackNo: assign({
        currentPlaybackNo: ({ currentPlaybackNo }) => {
          if (currentPlaybackNo === 0) return 0;
          return currentPlaybackNo - 1;
        },
      }),

      changeCurrentTrack: assign(({ tracks, currentPlaybackNo }) => {
        return { currentTrack: tracks[currentPlaybackNo] };
      }),

      setTrack: send(
        ({ currentTrack }) => ({ type: "SET_TRACK", track: currentTrack }),
        { to: "musicPlayer" }
      ),

      setMediaMetadata: ({ currentTrack }) => {
        if (navigator.mediaSession) {
          if (currentTrack) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: currentTrack.name,
              artwork: [
                {
                  src: currentTrack.artworkM.url || "",
                  sizes: "300x300",
                  type: "image/png",
                },
              ],
            });
          }
        }
      },

      load: send("LOAD", { to: "musicPlayer" }),

      play: send("PLAY", { to: "musicPlayer" }),

      pause: send("PAUSE", { to: "musicPlayer" }),

      stop: () => console.log("stop"),
    },

    guards: {
      canNextPlay: ({ tracks, currentPlaybackNo }) =>
        currentPlaybackNo + 1 !== tracks.length,
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

inspect({ iframe: false });

export const playerService = interpret(JukeboxMachine, {
  devTools: process.env.NODE_ENV === "development",
}).start();

export type PlayerService = typeof playerService;

export const PlayerContext = React.createContext<PlayerService>(playerService);
