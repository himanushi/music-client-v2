/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "theme/variables.css";
import "theme/custom.css";

import { IonApp, IonPage } from "@ionic/react";
import Initializer from "initializers/Initializer";
import FooterPlayer from "pages/main/FooterPlayer";
import MenuBar from "pages/main/MenuBar";
import MenuList from "pages/main/MenuList";
import Routing from "pages/main/Routing";
import React from "react";

const App: React.FC = () => (
  <IonApp>
    <Initializer />
    <IonPage>
      <FooterPlayer />
      <MenuList />
      <MenuBar />
      <Routing />
    </IonPage>
  </IonApp>
);

export default App;
