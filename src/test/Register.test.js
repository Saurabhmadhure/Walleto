import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import { screen } from "@testing-library/react";

import SignUpModel from "./SignUpModel";
// jest.mock("../../Services/user-Service");
jest.mock("axios");

describe("SignUpModel component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component", () => {
    const { getByText } = render(<SignUpModel />);
    const title = screen.getByText("Register Yourself");
    expect(title).toBeInTheDocument();
  });

  it("shows an error message if name is not entered", async () => {
    // const { getByText, getByLabelText } = render(<SignUpModel />);
    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByText(/submit/i);
    await (async () => {
      fireEvent.change(nameInput, { target: { value: "" } });
      fireEvent.click(submitButton);
    });
    const errorMessage = screen.getByText(/please enter name/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows an error message if password is less than 6 characters", async () => {
    // const { getByText, getByLabelText } = render(<SignUpModel />);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/submit/i);
    await (async () => {
      fireEvent.change(passwordInput, { target: { value: "123" } });
      fireEvent.click(submitButton);
    });
    const errorMessage = screen.getByText(
      /password should be more than 6 digit/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows an error message if there is a 400 status error", async () => {
    // const { getByText, getByLabelText } = render(<SignUpModel />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/submit/i);
    axios.post.mockRejectedValueOnce({ response: { status: 400 } });

    await (async () => {
      fireEvent.change(nameInput, { target: { value: "Test User" } });
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);
    });
    const errorMessage = screen.getByText(
      /something went wrong, please try again later/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows an error message if the email is already taken", async () => {
    // const { getByText, getByLabelText } = render(<SignUpModel />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/submit/i);
    axios.post.mockRejectedValueOnce({ response: { status: 409 } });
    await (async () => {
      fireEvent.change(nameInput, { target: { value: "Test User" } });
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);
    });
    const errorMessage = screen.getByText(
      /this email id is already present please try another one/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows a success message if sign up is successful", async () => {
    // const { getByText, getByLabelText } = render(<SignUpModel />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/submit/i);
    axios.post.mockRejectedValueOnce({ balance: 0 });
    await (async () => {
      fireEvent.change(nameInput, { target: { value: "Test User" } });
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);
    });
    const successMessage = screen.getByText(/signup successful/i);
    expect(successMessage).toBeInTheDocument();
  });
});
