import useController from "pages/login/use-controller";
import { Layout as Main } from "pages/main/layout";
import React from "react";

import { Layout } from "./layout";

export const LoginPage: React.FC = React.memo(() => {
  const { login, error } = useController();

  return (
    <Main>
      <Layout login={login} error={error} />
    </Main>
  );
});
