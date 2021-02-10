import { IonContent } from "@ionic/react";
import { Layout, Loading } from "pages/album/layout";
import useController from "pages/album/use-controller";
import { Error } from "pages/default-page";
import { Layout as MainLayout } from "pages/main/layout";
import React from "react";
import { RouteComponentProps } from "react-router";

export const AlbumPage: React.FC<RouteComponentProps<{ id?: string }>> = (
  props
) => {
  const id = props.match.params.id as string;
  const { album, error } = useController({ id });

  let page: JSX.Element = <Loading />;
  if (error) {
    page = <Error message={error.message} />;
  } else if (album) {
    page = <Layout album={album} />;
  }

  return (
    <MainLayout>
      <IonContent className="ion-no-padding">{page}</IonContent>
    </MainLayout>
  );
};
