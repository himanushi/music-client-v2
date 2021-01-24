import { AlbumsQueryVariables } from "graphql/types";
import buildParameters from "lib/buildParameters";
import { Layout, SearchBar } from "pages/albums/Layout";
import useController from "pages/albums/useController";
import { Error } from "pages/DefaultPage";
import { Layout as MainLayout } from "pages/main/Layout";
import React from "react";
import { RouteComponentProps } from "react-router";

export const AlbumsPage: React.FC<RouteComponentProps> = (props) => {
  const params = buildParameters<AlbumsQueryVariables>(
    "album",
    props.location,
    { conditions: {}, cursor: { limit: 50, offset: 0 } }
  );

  const { albums, error, loadMore, hasNext } = useController(params);

  console.log({ props });

  let page: JSX.Element = <></>;
  if (error) {
    page = <Error message={error.message} />;
  } else if (albums) {
    page = <Layout albums={albums} loadMore={loadMore} hasNext={hasNext} />;
  }

  return (
    <MainLayout header={<SearchBar history={props.history} params={params} />}>
      {page}
    </MainLayout>
  );
};
