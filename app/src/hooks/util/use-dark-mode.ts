import { cookie } from "lib/cookie";
import { useCallback, useEffect, useState } from "react";

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    // Cookie を優先する
    if (cookie.get("DarkMode") !== undefined) {
      setDarkMode(cookie.get("DarkMode") === "true");
    }
  }, []);

  const onClick = useCallback(() => {
    document.body.classList.toggle("dark", !darkMode);
    cookie.set("DarkMode", (!darkMode).toString());
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }, [darkMode]);

  return { darkMode, onClick };
};

export default useDarkMode;
