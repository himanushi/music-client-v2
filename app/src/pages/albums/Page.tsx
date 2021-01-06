import { Layout } from "pages/albums/Layout";
import useController from "pages/albums/useController";
import { Error, Loading } from "pages/DefaultPage";
import { Layout as Main } from "pages/main/Layout";
import React from "react";

const Page: React.FC = () => {
  const { albums, loading, error, loadMore } = useController();

  let content: JSX.Element;
  if (loading) {
    content = <Loading />;
  } else if (error) {
    content = <Error message={error.message} />;
  } else {
    content = <Layout albums={albums} loadMore={loadMore} />;
  }

  return <Main>{content}</Main>;
};

export default Page;
