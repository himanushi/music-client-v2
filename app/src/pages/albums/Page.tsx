import { Layout } from "pages/albums/Layout";
import useController from "pages/albums/useController";
import { Error } from "pages/DefaultPage";
import { Layout as MainLayout } from "pages/main/Layout";
import React from "react";

export const AlbumsPage: React.FC = () => {
  const { albums, error, loadMore, isLoaded } = useController();

  let page: JSX.Element = <></>;
  if (error) {
    page = <Error message={error.message} />;
  } else if (albums) {
    page = <Layout albums={albums} loadMore={loadMore} isLoaded={isLoaded} />;
  }

  return <MainLayout>{page}</MainLayout>;
};
