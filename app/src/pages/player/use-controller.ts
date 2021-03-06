import { useService } from "@xstate/react";
import { PlayerContext } from "machines/jukebox-machine";
import { useContext } from "react";

const useController = () => {
  const service = useContext(PlayerContext);
  const [state, send] = useService(service);
  return { send, state };
};

export default useController;
