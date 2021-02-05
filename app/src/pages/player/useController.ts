import { useService } from "@xstate/react";
import { PlayerContext } from "machines/JukeboxMachine";
import { useContext } from "react";

const useController = () => {
  const service = useContext(PlayerContext);
  const [state, send] = useService(service);
  return { state, send };
};

export default useController;
