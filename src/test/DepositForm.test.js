import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import DepositForm from "../Pages/Dashboard/Deposit";

describe("DepositForm component", () => {
  const userDetails = {
    accNo: "1234567890",
    balance: 1000,
    token: "jwtToken",
  };

  const handleDepositSuccess = jest.fn();

  test("renders amount input and deposit button", () => {
    render(
      <DepositForm
        userDetails={userDetails}
        handleDepositSuccess={handleDepositSuccess}
      />
    );
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Deposit");
  });

  test("submitting the form with valid data triggers handleDepositSuccess", async () => {
    render(
      <DepositForm
        userDetails={userDetails}
        handleDepositSuccess={handleDepositSuccess}
      />
    );
    const amountInput = screen.getByLabelText("Amount");
    const depositButton = screen.getByRole("button");

    fireEvent.change(amountInput, { target: { value: "500" } });
    fireEvent.click(depositButton);

    expect(handleDepositSuccess).not.toHaveBeenCalled();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    expect(handleDepositSuccess).toHaveBeenCalled();
  });

  test("submitting the form with empty amount shows error toast", async () => {
    render(
      <DepositForm
        userDetails={userDetails}
        handleDepositSuccess={handleDepositSuccess}
      />
    );
    const depositButton = screen.getByRole("button");

    fireEvent.click(depositButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    expect(screen.getByText("Please Enter Amount")).toBeInTheDocument();
  });
});
