import { PlayerFooter } from "pages/player/Layout";
import useController from "pages/player/useController";
import React from "react";

export const PlayerPage: React.FC = () => {
  const { state, send } = useController();
  return <PlayerFooter state={state} send={send} />;
};
