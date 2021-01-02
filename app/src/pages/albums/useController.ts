import { Album } from "graphql/types";
import useAlbums from "hooks/models/useAlbums";
import { useEffect, useState } from "react";

const useController = () => {
  const [load, { called, data }] = useAlbums();
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    if (!called) load();
    if (data) {
      setAlbums(data.items);
    }
  }, [called, data, load]);

  return { albums };
};

export default useController;
