import { IonPage } from "@ionic/react";
import { Layout } from "pages/albums/Layout";
import useController from "pages/albums/useController";
import { Error, Loading } from "pages/DefaultPage";
import React from "react";

const Page = () => {
  const { albums, loading, error } = useController();

  let content: JSX.Element;
  if (loading) {
    content = <Loading />;
  } else if (error) {
    content = <Error message={error.message} />;
  } else {
    content = <Layout albums={albums} />;
  }

  return <IonPage>{content}</IonPage>;
};

export default Page;
