import { DocumentNode, useLazyQuery } from "@apollo/client";

const useModels = <TData, TVariables>(
  doc: DocumentNode,
  variables?: TVariables
) => {
  const result = useLazyQuery<TData, TVariables>(doc, variables);
  return result;
};

export default useModels;
