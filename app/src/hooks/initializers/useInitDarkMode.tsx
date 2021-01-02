import useDarkMode from "hooks/util/useDarkMode";
import { cookie } from "lib/cookie";
import { useEffect } from "react";

const useInitDarkMode = () => {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    cookie.set("dark-mode", darkMode.toString());
  }, [darkMode]);
};

export default useInitDarkMode;
