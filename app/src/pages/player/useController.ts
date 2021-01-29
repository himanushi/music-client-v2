import { useService } from "@xstate/react";
import { playerService } from "machines/PlayerMachine";

const useController = () => {
  const [state, send] = useService(playerService);
  return { state, send };
};

export default useController;
