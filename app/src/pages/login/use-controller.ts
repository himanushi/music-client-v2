import { useMutation } from "@apollo/client";
import { CurrentUser, LoginDocument } from "graphql/types";

export type LoginProps = {
  event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>;
  input: {
    username: string;
    password: string;
  };
};

type MutationData = {
  login?: {
    currentUser?: CurrentUser;
    error?: string;
  };
};

const useController = () => {
  const [login, { data }] = useMutation<MutationData>(LoginDocument, {
    /*
     * Update: (cache, results) => {
     *   if (results.data?.login?.currentUser) {
     *     cache.writeQuery<TData, TVariables>({
     *       query: MeDocument,
     *       data: { me: results.data.login.currentUser },
     *     });
     *   }
     * },
     */
  });

  const submitLogin = (props: LoginProps) => {
    props.event.persist();
    props.event.preventDefault();

    login({
      variables: {
        input: props.input,
      },
    });
  };

  return {
    error: data?.login?.error,
    login: submitLogin,
    me: data?.login?.currentUser,
  };
};

export default useController;
