import React, { useEffect } from "react";

const InitDarkMode = () => {
  useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("dark", darkMode);
  }, []);

  return <></>;
};

export default InitDarkMode;
