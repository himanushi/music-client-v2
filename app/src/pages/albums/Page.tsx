import Layout from "pages/albums/Layout";
import useController from "pages/albums/useController";
import React from "react";

const Page = () => {
  const { albums } = useController();
  return <Layout albums={albums} />;
};

export default Page;
