import { Formik } from "formik";

import SignInForm from "./SignInForm/SignInForm";

import useSignIn from "../hooks/useSignIn";
import useAuthStorage from "../hooks/useAuthStorage";

import * as yup from "yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().min(4).max(30).required("Username is required"),
  password: yup.string().min(6).max(30).required("Password is required"),
});

const SignIn = () => {
  const [signIn, result] = useSignIn();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      //   console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.authenticate.accessToken;
      authStorage.getAccessToken().then((accessToken) => {
        console.log("token from storage: ", accessToken);
      });
      navigate("/");
    }
  }, [result.data]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
