import { DocumentNode, MutationHookOptions, useMutation } from "@apollo/client";

const useModelsMutation = <TData, TVariables>(
  doc: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
) => {
  const result = useMutation<TData, TVariables>(doc, options);
  return result;
};

export default useModelsMutation;
