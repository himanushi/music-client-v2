import useArtistQuery from "hooks/models/useArtistQuery";

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
