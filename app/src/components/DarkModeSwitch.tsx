import { IonButton, IonIcon } from "@ionic/react";
import { moon, sunny } from "ionicons/icons";
import { cookie } from "lib/cookie";
import React, { useCallback, useEffect, useState } from "react";

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // cookie を優先する
    if (cookie.get("dark-mode") !== undefined) {
      setDarkMode(cookie.get("dark-mode") === "true");
    }
  }, []);

  const onClick = useCallback(() => {
    document.body.classList.toggle("dark", !darkMode);
    cookie.set("dark-mode", (!darkMode).toString());
    setDarkMode(!darkMode);
  }, [darkMode]);

  let icon;
  if (darkMode) {
    icon = sunny;
  } else {
    icon = moon;
  }

  return (
    <IonButton onClick={onClick}>
      <IonIcon slot="icon-only" icon={icon}></IonIcon>
    </IonButton>
  );
};

export default DarkModeSwitch;
