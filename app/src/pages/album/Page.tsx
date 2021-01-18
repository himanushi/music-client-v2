import { IonContent } from "@ionic/react";
import { Layout, Loading } from "pages/album/Layout";
import useController from "pages/album/useController";
import { Error } from "pages/DefaultPage";
import { Layout as MainLayout } from "pages/main/Layout";
import React from "react";
import { RouteComponentProps } from "react-router";

export const AlbumPage: React.FC<
  RouteComponentProps<{ id?: string }>
> = React.memo((props) => {
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
});
