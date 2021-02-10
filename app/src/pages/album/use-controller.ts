import useAlbumQuery from "hooks/models/use-album-query";

type Props = {
  id: string;
};

const useController = ({ id }: Props) => {
  const { data, loading, error } = useAlbumQuery({
    variables: { id },
    fetchPolicy: "cache-first",
  });

  return {
    album: data?.album,
    loading,
    error,
  };
};

export default useController;
