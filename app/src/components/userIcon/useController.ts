import useMe from "hooks/models/useMe";

const useController = () => {
  const { data, loading, error } = useMe();

  return { me: data?.me, loading, error };
};

export default useController;
