import { Layout } from "pages/albums/Layout";
import useController from "pages/albums/useController";
import { Error, Loading } from "pages/DefaultPage";
import { Layout as Main } from "pages/main/Layout";
import React from "react";

const Page: React.FC = () => {
  const { albums, loading, error, loadMore } = useController();

  let page: JSX.Element = <></>;
  if (loading) {
    page = <Loading />;
  } else if (error) {
    page = <Error message={error.message} />;
  } else if (albums) {
    page = <Layout albums={albums} loadMore={loadMore} />;
  }

  return <Main>{page}</Main>;
};

export default Page;
