import useInitDarkMode from "hooks/initializers/useInitDarkMode";
import useInitMe from "hooks/initializers/useInitMe";

// TODO: initializer が増えるほど初回 render が増えるため対策を考えること
// アンチパターンなのかもしれない
const useInitializer = () => {
  const results = [useInitDarkMode(), useInitMe()];
  return results.every(Boolean);
};

export default useInitializer;
