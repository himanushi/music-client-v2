import { AlbumsQueryVariables } from "graphql/types";
import buildParameters from "lib/build-parameters";
import { Error } from "pages/default-page";
import { Layout as MainLayout } from "pages/main/layout";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { Layout, SearchBar } from "./layout";
import useController from "./use-controller";

export const AlbumsPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const params = buildParameters<AlbumsQueryVariables>("album", location, {
    conditions: {},
    cursor: { limit: 50, offset: 0 },
  });

  const { albums, error, loadMore } = useController(params);

  let page: JSX.Element = <></>;
  if (error) {
    page = <Error message={error.message} />;
  } else if (albums) {
    page = <Layout albums={albums} loadMore={loadMore} />;
  }

  return (
    <MainLayout header={<SearchBar history={history} params={params} />}>
      {page}
    </MainLayout>
  );
};

export const MemorizedAlbumsPage = React.memo(AlbumsPage);
