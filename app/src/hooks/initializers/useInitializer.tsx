import useInitDarkMode from "hooks/initializers/useInitDarkMode";
import useInitMe from "hooks/initializers/useInitMe";

const useInitializer = () => {
  const results = [useInitDarkMode(), useInitMe()];
  return results.every(Boolean);
};

export default useInitializer;
