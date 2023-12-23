import { Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import NewReviewForm from "./Forms/NewReviewForm/NewReviewForm";
import { useNavigate } from "react-router-native";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required("Rating is required and must be between 0 and 100"),
  text: yup.string(),
});

const NewReviewContainer = ({ initialValues, validationSchema, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <NewReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const NewReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: parseInt(rating),
            text,
          },
        },
      });
      const repositoryId = data.createReview.repositoryId;
      console.log("navigate to", repositoryId);
      navigate(`/${repositoryId}`);
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <NewReviewContainer
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default NewReview;
