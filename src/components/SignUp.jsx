import { Formik } from "formik";
import SignUpForm from "./Forms/SignUpForm/SignUpForm";
import useSignIn from "../hooks/useSignIn";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().min(4).max(30).required("Username is required"),
  password: yup.string().min(6).max(30).required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const SignUpContainer = ({
  initialValues,
  validationSchema,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {

  const [mutate] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await mutate({
        variables: {
          user: {
            username,
            password,
          },
        },
      });

      await signIn({ username, password });
      navigate("/");
      console.log(data);
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <SignUpContainer
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default SignUp;
