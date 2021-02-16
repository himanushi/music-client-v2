import { IonIcon } from "@ionic/react";
import { heart } from "ionicons/icons";
import React from "react";

const FavoriteComponent = React.memo(() => {
  return <IonIcon style={{ fontSize: 25 }} color="favorite" icon={heart} />;
});

export default FavoriteComponent;
