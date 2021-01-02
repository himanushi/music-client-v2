import { DocumentNode, useLazyQuery } from "@apollo/client";

const useModels = <TData, TVariables>(
  doc: DocumentNode,
  variables?: TVariables
) => {
  const query = useLazyQuery<TData, TVariables>(doc, variables);
  return query;
};

export default useModels;
