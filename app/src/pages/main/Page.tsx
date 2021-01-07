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

import { ApolloProvider } from "@apollo/client";
import { IonApp, IonLoading, createAnimation, setupConfig } from "@ionic/react";
import client from "graphql/client";
import Routing from "pages/main/Routing";
import useController from "pages/main/useController";
import React from "react";

setupConfig({
  // ページ遷移時にヘッダーフッターもアニメーションが実行されるため無効にする
  navAnimation: (_baseEl: any) => {
    return createAnimation();
  },
});

const Page: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <InitPage />
    </ApolloProvider>
  );
};

export default Page;

const InitPage: React.FC = () => {
  const { initialized } = useController();

  if (!initialized) {
    return <IonLoading isOpen={!initialized} message={"Loading..."} />;
  }

  return (
    <IonApp>
      <Routing />
    </IonApp>
  );
};
