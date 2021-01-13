import { BaseQueryOptions, DocumentNode, useQuery } from "@apollo/client";

const useModelsQuery = <TData, TVariables>(
  doc: DocumentNode,
  variables?: TVariables
) => {
  const result = useQuery<TData, BaseQueryOptions<TVariables>>(doc, variables);
  return result;
};

export default useModelsQuery;
