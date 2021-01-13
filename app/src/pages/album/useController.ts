import useAlbumQuery from "hooks/models/useAlbumQuery";

type Props = {
  id: string;
};

const useController = ({ id }: Props) => {
  const { data, loading, error } = useAlbumQuery({
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  return {
    album: data?.album,
    loading,
    error,
  };
};

export default useController;
