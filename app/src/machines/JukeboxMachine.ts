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
  PayloadSender,
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
  | { type: "REPLACE"; tracks: JukeboxContext["tracks"] }
  | { type: "SHUFFLE" }
  // Player
  | { type: "PLAY" }
  | { type: "NEXT_PLAY" }
  | { type: "PREVIOUS" }
  | { type: "PAUSE" }
  | { type: "STOP" }
  | { type: "LOADING" }
  | { type: "SEEK" }
  | { type: "REPEAT" };

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

    entry: "initMusicPlayer",

    states: {
      idle: {},
      loading: {
        entry: ["sendTrack", "play"],
        on: { PLAY: "playing" },
      },
      playing: {},
      paused: {},
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
    },
  },
  {
    actions: {
      initMusicPlayer: assign({
        musicPlayerRef: (_) => {
          console.log("spa");
          return spawn(MusicPlayerMachine, "musicPlayer");
        },
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

      changeCurrentTrack: assign(({ tracks, currentPlaybackNo }) => {
        return { currentTrack: tracks[currentPlaybackNo] };
      }),

      sendTrack: send(
        ({ currentTrack }) => ({ type: "SET_TRACK", track: currentTrack }),
        { to: "musicPlayer" }
      ),

      play: send("PLAY", { to: "musicPlayer" }),

      stop: () => console.log("stop"),
    },

    guards: {
      canNextPlay: ({ tracks, currentPlaybackNo }) =>
        currentPlaybackNo + 1 !== tracks.length,
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

export type PlayerService = {
  state: JukeboxState;
  send: PayloadSender<JukeboxEvent>;
};

export const PlayerContext = React.createContext<PlayerService | null>(null);
