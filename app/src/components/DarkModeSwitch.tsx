import { IonButton, IonIcon } from "@ionic/react";
import { moonSharp, sunnyOutline } from "ionicons/icons";
import React, { useCallback, useEffect, useState } from "react";
import { cookie } from "utilities/cookie";

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
    icon = sunnyOutline;
  } else {
    icon = moonSharp;
  }

  return (
    <IonButton onClick={onClick}>
      <IonIcon slot="icon-only" icon={icon}></IonIcon>
    </IonButton>
  );
};

export default DarkModeSwitch;
