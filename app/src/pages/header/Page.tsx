import { MemoizedHeader, MenuBar } from "pages/header/layout";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export const Header: React.FC<Props> = (props) => {
  return (
    <MemoizedHeader>
      <MenuBar />
      {props.children}
    </MemoizedHeader>
  );
};
