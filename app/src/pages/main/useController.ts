import { useService } from "@xstate/react";
import useInitializer from "hooks/initializers/useInitializer";
import { playerService } from "machines/JukeboxMachine";

const useController = () => {
  const initialized = useInitializer();
  const [state, send] = useService(playerService);
  const service = { state, send };

  return { initialized, service };
};

export default useController;
