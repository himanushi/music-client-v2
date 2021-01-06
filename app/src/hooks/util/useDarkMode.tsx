import { cookie } from "lib/cookie";
import { useCallback, useEffect, useState } from "react";

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // cookie を優先する
    if (cookie.get("DarkMode") !== undefined) {
      setDarkMode(cookie.get("DarkMode") === "true");
    }
  }, []);

  const onClick = useCallback(() => {
    document.body.classList.toggle("dark", !darkMode);
    cookie.set("DarkMode", (!darkMode).toString());
    setDarkMode(!darkMode);
  }, [darkMode]);

  return { darkMode, onClick };
};

export default useDarkMode;
