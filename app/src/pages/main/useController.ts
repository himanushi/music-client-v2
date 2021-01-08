import useInitializer from "hooks/initializers/useInitializer";

const useController = () => {
  const initialized = useInitializer();
  return { initialized };
};

export default useController;
