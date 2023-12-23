import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../components/SignIn";
import * as yup from "yup";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const initialValues = {
        username: "",
        password: "",
      };

      const mockSubmit = jest.fn();

      const validationSchema = yup.object().shape({
        username: yup.string().min(4).max(30).required("Username is required"),
        password: yup.string().min(6).max(30).required("Password is required"),
      });

      // render the SignInContainer component, fill the text inputs and press the submit button

      render(
        <SignInContainer
          initialValues={initialValues}
          onSubmit={mockSubmit}
          validationSchema={validationSchema}
        />
      );
      // screen.debug();

      const usernameField = screen.getAllByTestId("usernameField");
      const passwordField = screen.getAllByTestId("passwordField");
      const submitButton = screen.getAllByTestId("submitButton");

      expect(usernameField).toBeDefined();
      expect(passwordField).toBeDefined();
      expect(submitButton).toBeDefined();

      console.log(Object.keys(usernameField));

      fireEvent.changeText(usernameField[0], "kalle");
      fireEvent.changeText(passwordField[0], "password");
      fireEvent.press(submitButton[0]);

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(mockSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
