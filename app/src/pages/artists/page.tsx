import { Layout } from "pages/artists/layout";
import useController from "pages/artists/use-controller";
import { Error } from "pages/default-page";
import { Layout as MainLayout } from "pages/main/layout";
import React from "react";

export const ArtistsPage: React.FC = () => {
  const { artists, error, loadMore, hasNext } = useController();

  let page: JSX.Element = <></>;
  if (error) {
    page = <Error message={error.message} />;
  } else if (artists) {
    page = <Layout artists={artists} loadMore={loadMore} hasNext={hasNext} />;
  }

  return <MainLayout>{page}</MainLayout>;
};
