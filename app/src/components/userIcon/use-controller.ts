import useMeQuery from "hooks/models/use-me-query";

const useController = () => {
  const { data, loading, error } = useMeQuery();

  return { me: data?.me, loading, error };
};

export default useController;
