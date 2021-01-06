import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import AlbumsPage from "pages/albums/Page";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const Routing: React.FC = () => (
  <IonReactRouter>
    <IonRouterOutlet>
      <Route path="/albums" component={AlbumsPage} />
      <Route exact path="/" render={() => <Redirect to="/albums" />} />
    </IonRouterOutlet>
  </IonReactRouter>
);

export default Routing;
