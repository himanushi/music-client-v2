import { Layout } from "components/user-icon/layout";
import useController from "components/user-icon/use-controller";
import React from "react";

const Component: React.FC = () => {
  const { me } = useController();

  let component: JSX.Element = <></>;
  if (me) {
    component = <Layout me={me} />;
  }

  return component;
};

export default Component;
