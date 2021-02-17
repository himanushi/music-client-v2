import { PlayerFooter } from "pages/player/layout";
import useController from "pages/player/use-controller";
import React from "react";

export const PlayerPage: React.FC = () => {
  const { state, send } = useController();
  return <PlayerFooter state={state} send={send} />;
};
