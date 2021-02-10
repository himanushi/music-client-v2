import useDarkMode from "hooks/util/use-dark-mode";
import { cookie } from "lib/cookie";
import { useLayoutEffect, useState } from "react";

const useInitDarkMode = () => {
  const [initialized, setInitialized] = useState(false);
  const { darkMode } = useDarkMode();

  useLayoutEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    cookie.set("DarkMode", darkMode.toString());
    setInitialized(true);
  }, [darkMode]);

  return initialized;
};

export default useInitDarkMode;
