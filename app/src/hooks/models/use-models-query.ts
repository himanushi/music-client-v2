import { DocumentNode, QueryFunctionOptions, useQuery } from "@apollo/client";

const useModelsQuery = <TData, TVariables>(
  doc: DocumentNode,
  variables?: TVariables
) => {
  const result = useQuery<TData, QueryFunctionOptions<TVariables>>(
    doc,
    variables
  );
  return result;
};

export default useModelsQuery;
