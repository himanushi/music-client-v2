import SearchBar from "components/searchBar/Component";
import { MemoizedHeader, MenuBar, Title } from "pages/header/Layout";
import useController from "pages/header/useController";
import React from "react";

const Page: React.FC = () => {
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
};

export default Page;
