import useArtistQuery from "hooks/models/use-artist-query";

type Props = {
  id: string;
};

const useController = ({ id }: Props) => {
  const { data, loading, error } = useArtistQuery({
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  return {
    artist: data?.artist,
    loading,
    error,
  };
};

export default useController;
