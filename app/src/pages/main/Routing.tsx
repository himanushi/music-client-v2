import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import AlbumPage from "pages/album/Page";
import AlbumsPage from "pages/albums/Page";
import LoginPage from "pages/login/Page";
import { MenuList } from "pages/main/Layout";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const Routing: React.FC = () => {
  return (
    <IonReactRouter>
      <MenuList />
      <IonRouterOutlet>
        <Route exact path="/albums" component={AlbumsPage} />
        <Route exact path="/albums/:id" component={AlbumPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" render={() => <Redirect to="/albums" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routing;
