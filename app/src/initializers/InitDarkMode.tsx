import { cookie } from "lib/cookie";
import React, { useEffect } from "react";

const InitDarkMode = () => {
  useEffect(() => {
    let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // cookie を優先する
    if (cookie.get("dark-mode") !== undefined) {
      darkMode = cookie.get("dark-mode") === "true";
    }

    document.body.classList.toggle("dark", darkMode);
    cookie.set("dark-mode", darkMode.toString());
  }, []);

  return <></>;
};

export default InitDarkMode;
