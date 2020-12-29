import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";

const Home: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
      <IonContent>
        <h1>Home</h1>
      </IonContent>
    </IonPage>
  );
};

export default Home;
