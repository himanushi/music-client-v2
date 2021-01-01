import { IonContent, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import AlbumsPage from "pages/albums/AlbumsPage";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const Routing: React.FC = () => (
  <IonContent scrollX={false} scrollY={false}>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/albums" component={AlbumsPage} />
        <Route exact path="/" render={() => <Redirect to="/albums" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonContent>
);

export default Routing;
