import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { AlbumPage } from "pages/album/Page";
import { MemorizedAlbumsPage } from "pages/albums/Page";
import { ArtistPage } from "pages/artist/Page";
import { ArtistsPage } from "pages/artists/Page";
import { LoginPage } from "pages/login/Page";
import { MenuList } from "pages/main/Layout";
import React from "react";
import { Redirect, Route } from "react-router-dom";

// ref: https://github.com/ionic-team/ionic-framework/issues/21635#issuecomment-665790986
const Routing: React.FC = () => {
  return (
    <IonReactRouter>
      <MenuList />
      <IonRouterOutlet>
        <Route exact path="/artists/:id" component={ArtistPage} />
        <Route exact path="/artists" component={ArtistsPage} />
        <Route exact path="/albums/:id" component={AlbumPage} />
        <Route exact path="/albums" render={() => <MemorizedAlbumsPage />} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" render={() => <Redirect to="/albums" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routing;
