import { AlbumsQueryVariables } from "graphql/types";
import buildParameters from "lib/build-parameters";
import { Layout, SearchBar } from "pages/albums/layout";
import useController from "pages/albums/use-controller";
import { Error } from "pages/default-page";
import { Layout as MainLayout } from "pages/main/layout";
import React from "react";
import { useHistory, useLocation } from "react-router";

export const AlbumsPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const params = buildParameters<AlbumsQueryVariables>("album", location, {
    conditions: {},
    cursor: { limit: 50, offset: 0 },
  });

  /*
   * 不要な render が実行された場合は query を実行しない
   * https://github.com/ionic-team/ionic-framework/issues/21635
   */
  const skip = location.pathname !== "/albums";
  const { albums, error, loadMore, hasNext } = useController(params, skip);

  let page: JSX.Element = <></>;
  if (error) {
    page = <Error message={error.message} />;
  } else if (albums) {
    page = <Layout albums={albums} loadMore={loadMore} hasNext={hasNext} />;
  }

  return (
    <MainLayout header={<SearchBar history={history} params={params} />}>
      {page}
    </MainLayout>
  );
};

export const MemorizedAlbumsPage = React.memo(AlbumsPage);
