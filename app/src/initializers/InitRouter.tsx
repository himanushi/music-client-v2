import { IonContent, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import HomePage from "pages/HomePage";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const InitRouter: React.FC = () => (
  <IonContent scrollX={false} scrollY={false}>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={HomePage} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonContent>
);

export default InitRouter;
