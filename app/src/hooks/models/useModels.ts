import { DocumentNode, useLazyQuery } from "@apollo/client";

const useModels = <TData, TVariables>(
  doc: DocumentNode,
  variables?: TVariables
) => {
  const result = useLazyQuery<TData>(doc, { variables });
  return result;
};

export default useModels;
