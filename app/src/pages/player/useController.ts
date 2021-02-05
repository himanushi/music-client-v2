import { PlayerContext } from "machines/JukeboxMachine";
import { useContext } from "react";

const useController = () => {
  const service = useContext(PlayerContext);
  return { service };
};

export default useController;
