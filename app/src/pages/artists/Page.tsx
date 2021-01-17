import { Layout } from "pages/artists/Layout";
import useController from "pages/artists/useController";
import { Error } from "pages/DefaultPage";
import { Layout as MainLayout } from "pages/main/Layout";
import React from "react";

export const ArtistsPage: React.FC = () => {
  const { artists, error, loadMore, isLoaded } = useController();

  let page: JSX.Element = <></>;
  if (error) {
    page = <Error message={error.message} />;
  } else if (artists) {
    page = <Layout artists={artists} loadMore={loadMore} isLoaded={isLoaded} />;
  }

  return <MainLayout>{page}</MainLayout>;
};
