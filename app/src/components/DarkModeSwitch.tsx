import { IonButton, IonIcon } from "@ionic/react";
import { moonSharp, sunnyOutline } from "ionicons/icons";
import React, { useCallback, useState } from "react";

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const onClick = useCallback(() => {
    document.body.classList.toggle("dark", !darkMode);
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
