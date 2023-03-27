import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginModel from "../Pages/Modals/LoginModel";
import { loginUser } from "../Services/user-Service";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

jest.mock("../Services/user-Service", () => ({
  loginUser: jest.fn(),
}));

describe("LoginModel", () => {
  const handleUserInfo = jest.fn();
  const onHide = jest.fn();
  const props = { handleUserInfo, onHide };
  const mockAxios = new MockAdapter(axios);
  test("calls handleUserInfo with the token data when login form is submitted successfully", async () => {
    render(<LoginModel {...props} />);
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    const tokenData = {
      token: "mock-token",
      name: "mock-user",
      accNo: "123456",
    };
    mockAxios.onPost("http://localhost:8080/users/login").reply(200, tokenData);

    fireEvent.change(emailInput, {
      target: { value: "saurabhmadhure@gmail.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "Password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(handleUserInfo).toHaveBeenCalledWith(tokenData));
  });

  test("displays an error toast when email or password is empty", async () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(submitButton);

    const toastElement = await screen.findByRole("alert");
    expect(toastElement).toHaveTextContent("Email is Empty");
  });

  test("displays an error toast when login fails due to invalid email or password", async () => {
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    const errorMessage = "Insert a Valid Email and Password";
    loginUser.mockRejectedValueOnce({ response: { status: 403 } });

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "invalid-password" } });
    fireEvent.click(submitButton);

    const toastElement = await screen.findByRole("alert");
    expect(toastElement).toHaveTextContent(errorMessage);
  });

  test("displays an error toast when login fails due to other reasons", async () => {
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    const errorMessage = "Something Went Wrong !!";
    loginUser.mockRejectedValueOnce(new Error(errorMessage));

    fireEvent.change(emailInput, {
      target: { value: "saurabhmadhure@gmail.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "Password123" } });
    fireEvent.click(submitButton);

    const toastElement = await screen.findByRole("alert");
    expect(toastElement).toHaveTextContent(errorMessage);
  });
});
