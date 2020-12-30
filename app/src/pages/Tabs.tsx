import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, settings } from "ionicons/icons";
import React from "react";
import { Redirect, Route } from "react-router-dom";

import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";

const Tabs: React.FC = () => (
  <IonReactRouter>
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
          <IonLabel>home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="settings" href="/settings">
          <IonIcon icon={settings} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>

      <IonRouterOutlet>
        <Route path="/home" component={HomePage} />
        <Route path="/settings" component={SettingsPage} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonTabs>
  </IonReactRouter>
);

export default Tabs;
