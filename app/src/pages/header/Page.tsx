import SearchBar from "components/searchBar/Component";
import { MemoizedHeader, MenuBar, Title } from "pages/header/Layout";
import useController from "pages/header/useController";
import React, { memo } from "react";

export const Header: React.FC = memo(() => {
  const { enableSearchBar } = useController();

  let searchBar = <></>;
  if (enableSearchBar) {
    searchBar = <SearchBar />;
  }

  return (
    <MemoizedHeader>
      <MenuBar>
        <Title />
      </MenuBar>
      {searchBar}
    </MemoizedHeader>
  );
});
