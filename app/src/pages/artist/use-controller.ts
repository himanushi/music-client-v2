import useArtistQuery from "hooks/models/use-artist-query";

type Props = {
  id: string;
};

const useController = ({ id }: Props) => {
  const { data, loading, error } = useArtistQuery({
    fetchPolicy: "cache-and-network",
    variables: { id },
  });

  return {
    artist: data?.artist,
    error,
    loading,
  };
};

export default useController;
