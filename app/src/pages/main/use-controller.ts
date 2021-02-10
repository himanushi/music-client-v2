import useInitializer from "hooks/initializers/use-initializer";

const useController = () => {
  const initialized = useInitializer();
  return { initialized };
};

export default useController;
