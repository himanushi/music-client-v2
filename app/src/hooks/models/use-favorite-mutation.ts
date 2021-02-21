import { MutationHookOptions } from "@apollo/client";
import {
  ChangeFavoritesDocument,
  ChangeFavoritesInput,
  ChangeFavoritesPayload,
} from "graphql/types";
import useModelsMutation from "./use-models-mutation";

export type TData = {
  data: ChangeFavoritesPayload;
};

export type TVariables = {
  input: ChangeFavoritesInput;
};

const useFavoriteMutation = (
  options?: MutationHookOptions<TData, TVariables>
) => useModelsMutation<TData, TVariables>(ChangeFavoritesDocument, options);

export default useFavoriteMutation;
