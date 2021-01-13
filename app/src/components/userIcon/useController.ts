import useMeQuery from "hooks/models/useMeQuery";

const useController = () => {
  const { data, loading, error } = useMeQuery();

  return { me: data?.me, loading, error };
};

export default useController;
