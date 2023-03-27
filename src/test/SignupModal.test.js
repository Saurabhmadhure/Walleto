import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SignInModel from "../Pages/Modals/SignUpModal";

jest.mock("axios");

describe("SignInModel component", () => {
  test("renders Sign In Model component", () => {
    render(<SignInModel />);
    const signInModel = screen.getByText(/Register Yourself/i);
    expect(signInModel).toBeInTheDocument();
  });

  test("shows error if user name is not entered", async () => {
    render(<SignInModel />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(screen.getByText("Please enter Name.")).toBeInTheDocument();
    });
  });

  test("shows error if password length is less than 6", async () => {
    render(<SignInModel />);
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "12345" },
    });
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(
        screen.getByText("Password Should be more than 6 digit.")
      ).toBeInTheDocument();
    });
  });

  test("shows error message if user is already present", async () => {
    render(<SignInModel />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Saurabh" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "saurabh@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(
        screen.getByText(
          "This Email Id is Already Present Please Try Another One"
        )
      ).toBeInTheDocument();
    });
  });

  test("successfully registers user and closes the modal on submitting correct OTP", async () => {
    const mockResponse = { data: true };
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValue("saurabh@gmail.com");
    jest.spyOn(window.localStorage.__proto__, "setItem").mockReturnValue();
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });
    render(<SignInModel />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Saurabh" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "saurabh@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(
        screen.getByText("Otp has been Sent To your Registered Email")
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Enter OTP"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(async () => {
      const [textEl, otpEl] = await Promise.all([
        screen.queryByText("Otp has been Sent To your Registered Email"),
        screen.queryByLabelText("Enter OTP"),
      ]);

      expect(textEl).toBeNull();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(otpEl).toBeNull();
    });

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "tokens",
      undefined
    );
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "accounts",
      undefined
    );
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "email",
      "saurabh@gmail.com"
    );
    expect(window.localStorage.setItem).toHaveBeenCalledWith("name", "Saurabh");
  });
});
