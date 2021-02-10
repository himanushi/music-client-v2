import useInitDarkMode from "hooks/initializers/use-init-dark-mode";
import useInitMe from "hooks/initializers/use-init-me";

// TODO: initializer が増えるほど初回 render が増えるため対策を考えること
// アンチパターンなのかもしれない
const useInitializer = () => {
  const results = [useInitDarkMode(), useInitMe()];
  return results.every(Boolean);
};

export default useInitializer;
