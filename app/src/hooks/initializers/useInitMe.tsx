import useMe from "hooks/models/useMe";
import { useEffect, useState } from "react";

const useInitMe = () => {
  const [initialized, setInitialized] = useState(false);
  const { data } = useMe();

  useEffect(() => {
    if (data && data.me) {
      setInitialized(true);
    }
  }, [data]);

  return initialized;
};

export default useInitMe;
