import useDarkMode from "hooks/util/useDarkMode";
import { cookie } from "lib/cookie";
import { useEffect, useState } from "react";

const useInitDarkMode = () => {
  const [initialized, setInitialized] = useState(false);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    cookie.set("dark-mode", darkMode.toString());
    setInitialized(true);
  }, [darkMode]);

  return initialized;
};

export default useInitDarkMode;
