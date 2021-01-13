import { useLocation } from "react-router";

const useController = () => {
  const location = useLocation();

  let enableSearchBar = false;
  if (location.pathname === "/albums") {
    enableSearchBar = true;
  }

  return { enableSearchBar };
};

export default useController;
