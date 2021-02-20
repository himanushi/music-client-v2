import useMeQuery from "hooks/models/use-me-query";

const useController = () => {
  const { data, loading, error } = useMeQuery();

  return { error, loading, me: data?.me };
};

export default useController;
