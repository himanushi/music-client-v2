import { IonButton, IonIcon } from "@ionic/react";
import useDarkMode from "hooks/useDarkMode";
import { moon, sunny } from "ionicons/icons";
import React from "react";

const MemoDarkModeSwitch = React.memo(
  (props: { onClick: () => void; icon: string }) => (
    <IonButton onClick={props.onClick}>
      <IonIcon slot="icon-only" icon={props.icon}></IonIcon>
    </IonButton>
  )
);

const DarkModeSwitch = () => {
  const { darkMode, onClick } = useDarkMode();
  const icon = darkMode ? moon : sunny;

  return <MemoDarkModeSwitch onClick={onClick} icon={icon} />;
};

export default DarkModeSwitch;
