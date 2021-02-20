import useMeQuery from "hooks/models/use-me-query";

const useController = () => {
  const { data } = useMeQuery();

  let ids: string[] = [];

  if (data?.me) {
    ids = ids.concat(data.me.favorite.albumIds);
    ids = ids.concat(data.me.favorite.artistIds);
    ids = ids.concat(data.me.favorite.trackIds);
  }

  return { ids };
};

export default useController;
