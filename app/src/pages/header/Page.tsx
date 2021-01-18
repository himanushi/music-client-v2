import { MemoizedHeader, MenuBar } from "pages/header/Layout";
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
