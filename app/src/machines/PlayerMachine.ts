import { inspect } from "@xstate/inspect";
import { Track } from "graphql/types";
import {
  PreviewPlayerMachine,
  PreviewPlayerState,
  PreviewPlayerStateEvent,
} from "machines/PreviewPlayerMachine";
import {
  Machine,
  SpawnedActorRef,
  State,
  assign,
  interpret,
  send,
  spawn,
} from "xstate";

export type PlayerContext = {
  currentPlaybackNo: number;
  tracks: readonly Track[];
  currentTrack?: Track;
  repeat: boolean;
  previewPlayerRef?: SpawnedActorRef<
    PreviewPlayerStateEvent,
    PreviewPlayerState
  >;
};

export type PlayerStateSchema = {
  states: {
    idle: {};
    loading: {};
    playing: {};
    paused: {};
    stopped: {};
  };
};

export type PlayerStateEvent =
  // Queue
  | {
      type: "REPLACE_AND_PLAY";
      tracks: readonly Track[];
      currentPlaybackNo: number;
    }
  | { type: "REPLACE"; tracks: readonly Track[] }
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

export const PlayerMachine = Machine<
  PlayerContext,
  PlayerStateSchema,
  PlayerStateEvent
>(
  {
    id: "player",
    initial: "idle",

    context: {
      currentPlaybackNo: 0,
      tracks: [],
      repeat: false,
      previewPlayerRef: undefined,
    },

    entry: "setPlayers",

    states: {
      idle: {},

      loading: {
        entry: "initPlayer",
      },

      playing: {
        on: {
          PAUSE: "paused",
          LOADING: "loading",
          STOP: "stopped",
        },
      },

      paused: {
        on: { PLAY: "playing" },
      },

      stopped: {
        on: { PLAY: { target: "playing" } },
      },
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
      nextPlaybackNo: assign({
        currentPlaybackNo: ({ tracks, currentPlaybackNo }) => {
          if (currentPlaybackNo + 1 === tracks.length) return 0;
          return currentPlaybackNo + 1;
        },
      }),

      replaceTracks: assign({
        tracks: (_, event) => ("tracks" in event ? event.tracks : []),
      }),

      changePlaybackNo: assign((_, event) => {
        if (!("currentPlaybackNo" in event)) return {};
        return { currentPlaybackNo: event.currentPlaybackNo };
      }),

      changeCurrentTrack: assign(({ tracks, currentPlaybackNo }) => {
        return { currentTrack: tracks[currentPlaybackNo] };
      }),

      setPlayers: assign({
        previewPlayerRef: (_) => {
          console.log("setPlayers");
          return spawn(PreviewPlayerMachine, "preview");
        },
      }),

      initPlayer: send(
        (context) => {
          return { type: "INITIALIZE_PLAY", track: context.currentTrack };
        },
        { to: "preview" }
      ),

      play: () => {
        console.log("play");
      },

      stop: () => console.log("stop"),
    },

    guards: {
      canNextPlay: ({ tracks, currentPlaybackNo }) =>
        currentPlaybackNo + 1 !== tracks.length,
    },
  }
);

export type PlayerState = State<
  PlayerContext,
  PlayerStateEvent,
  PlayerStateSchema,
  {
    value: any;
    context: PlayerContext;
  }
>;

inspect({ iframe: false });

export const playerService = interpret(PlayerMachine, {
  devTools: process.env.NODE_ENV === "development",
}).start();
