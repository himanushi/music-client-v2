import { BaseQueryOptions, DocumentNode, useQuery } from "@apollo/client";

const useModels = <TData, TVariables>(
  doc: DocumentNode,
  variables?: TVariables
) => {
  const result = useQuery<TData, BaseQueryOptions<TVariables>>(doc, variables);
  return result;
};

export default useModels;
