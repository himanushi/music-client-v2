import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { AlbumPage } from "pages/album/page";
import { MemorizedAlbumsPage } from "pages/albums/page";
import { ArtistPage } from "pages/artist/page";
import { ArtistsPage } from "pages/artists/page";
import { LoginPage } from "pages/login/page";
import { MenuList } from "pages/main/layout";
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
