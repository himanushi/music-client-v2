import useMeQuery from "hooks/models/use-me-query";
import { useLayoutEffect, useState } from "react";

const useInitMe = () => {
  const [initialized, setInitialized] = useState(false);
  const { data } = useMeQuery();

  useLayoutEffect(() => {
    if (data && data.me) {
      setInitialized(true);
    }
  }, [data]);

  return initialized;
};

export default useInitMe;
