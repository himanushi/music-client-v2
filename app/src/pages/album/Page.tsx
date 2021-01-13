import { Layout } from "pages/album/Layout";
import useController from "pages/album/useController";
import { Error } from "pages/DefaultPage";
import { Layout as MainLayout } from "pages/main/Layout";
import React from "react";
import { RouteComponentProps } from "react-router";

const Page: React.FC<RouteComponentProps<{ id?: string }>> = React.memo(
  (props) => {
    const id = props.match.params.id as string;
    const { album, error } = useController({ id });

    let page: JSX.Element = <></>;
    if (error) {
      page = <Error message={error.message} />;
    } else if (album) {
      page = <Layout album={album} />;
    }

    return <MainLayout>{page}</MainLayout>;
  }
);

export default Page;
