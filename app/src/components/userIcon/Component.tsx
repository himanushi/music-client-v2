import { Layout } from "components/userIcon/Layout";
import useController from "components/userIcon/useController";
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
