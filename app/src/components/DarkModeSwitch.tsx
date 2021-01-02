import { IonButton, IonIcon } from "@ionic/react";
import useDarkMode from "hooks/useDarkMode";
import { moon, sunny } from "ionicons/icons";
import React from "react";

const DarkModeSwitch = () => {
  const { darkMode, onClick } = useDarkMode();

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
