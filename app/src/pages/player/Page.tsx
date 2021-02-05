import { PlayerFooter } from "pages/player/Layout";
import useController from "pages/player/useController";
import React from "react";

export const PlayerPage: React.FC = () => {
  const { service } = useController();
  if (!service) return <></>;
  return <PlayerFooter service={service} />;
};
