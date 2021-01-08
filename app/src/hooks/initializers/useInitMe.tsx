import useMe from "hooks/models/useMe";
import { useLayoutEffect, useState } from "react";

const useInitMe = () => {
  const [initialized, setInitialized] = useState(false);
  const { data } = useMe();

  useLayoutEffect(() => {
    if (data && data.me) {
      setInitialized(true);
    }
  }, [data]);

  return initialized;
};

export default useInitMe;
