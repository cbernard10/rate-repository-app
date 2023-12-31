import { Formik } from "formik";
import SignInForm from "./Forms/SignInForm/SignInForm";
import useSignIn from "../hooks/useSignIn";
import * as yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().min(4).max(30).required("Username is required"),
  password: yup.string().min(6).max(30).required("Password is required"),
});

export const SignInContainer = ({
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
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <SignInContainer
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default SignIn;
