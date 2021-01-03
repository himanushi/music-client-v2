import { Layout } from "pages/albums/Layout";
import useController from "pages/albums/useController";
import { Error, Loading } from "pages/DefaultPage";
import React from "react";

const Page = () => {
  const { albums, loading, error } = useController();

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  return <Layout albums={albums} />;
};

export default Page;
