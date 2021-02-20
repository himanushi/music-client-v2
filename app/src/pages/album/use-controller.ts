import useAlbumQuery from "hooks/models/use-album-query";

type Props = {
  id: string;
};

const useController = ({ id }: Props) => {
  const { data, loading, error } = useAlbumQuery({
    fetchPolicy: "cache-first",
    variables: { id },
  });

  return {
    album: data?.album,
    error,
    loading,
  };
};

export default useController;
