import { Layout } from "components/userIcon/layout";
import useController from "components/userIcon/use-controller";
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
