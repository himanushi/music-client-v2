import useController from "pages/login/useController";
import { Layout as Main } from "pages/main/Layout";
import React from "react";

import { Layout } from "./Layout";

const Page: React.FC = React.memo(() => {
  const { login, me, error } = useController();
  console.log({ me, error });

  return (
    <Main>
      <Layout login={login} error={error} />
    </Main>
  );
});

export default Page;
