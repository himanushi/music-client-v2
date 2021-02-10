import { IonContent } from "@ionic/react";
import { Layout } from "pages/artist/layout";
import useController from "pages/artist/use-controller";
import { Error } from "pages/default-page";
import { Layout as MainLayout } from "pages/main/layout";
import React from "react";
import { RouteComponentProps } from "react-router";

export const ArtistPage: React.FC<
  RouteComponentProps<{ id?: string }>
> = React.memo((props) => {
  const id = props.match.params.id as string;
  const { artist, error } = useController({ id });

  let page: JSX.Element = <></>;
  if (error) {
    page = <Error message={error.message} />;
  } else if (artist) {
    page = <Layout artist={artist} />;
  }

  return (
    <MainLayout>
      <IonContent className="ion-no-padding">{page}</IonContent>
    </MainLayout>
  );
});
