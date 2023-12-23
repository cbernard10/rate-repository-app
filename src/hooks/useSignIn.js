import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const navigate = useNavigate();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    client.resetStore();
    navigate("/");
    return data;
  };
  return [signIn, result];
};

export default useSignIn;
