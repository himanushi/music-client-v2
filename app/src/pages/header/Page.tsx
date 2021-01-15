import { MemoizedHeader, MenuBar } from "pages/header/Layout";
import React, { memo } from "react";

export const Header: React.FC = memo(() => {
  return (
    <MemoizedHeader>
      <MenuBar />
    </MemoizedHeader>
  );
});
