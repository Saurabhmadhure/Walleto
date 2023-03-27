import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form } from "react-bootstrap";

const SendMoneyForm = ({ userDetails, setOpenModal, onConfirm }) => {
  const [receiverId, setReceiverId] = useState();
  const [amount, setAmount] = useState(null);

  const handleSubmit = (event) => {
    var accountNo = userDetails.accNo;

    const data = {
      senderId: accountNo,
      receiverId: receiverId,
      sendAmount: amount,
    };
    const jwtToken = userDetails.token;
    console.log(jwtToken);

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };

    event.preventDefault();
    axios
      .post("http://localhost:8080/accounts/send", data, { headers })
      .then((response) => {
        if (response && response.status === 200) {
          console.log(response);
          console.log(response.data.cashback);
          toast.success(response.data.cashback);
          var cashb = response.data.cashback;
          setOpenModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);

        toast.error("Something Went Wrong");
      });
  };

  return (
    <>
      <Form
        bg="dark"
        variant="dark"
        onSubmit={handleSubmit}
        className="text-start">
        <Form.Group className="mb-3">
          <Form.Label>
            <h5>Receiver Account No.</h5>
          </Form.Label>
          <Form.Control
            type="text"
            id="receiverId"
            value={receiverId}
            onChange={(event) => setReceiverId(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-0">
          <Form.Label>
            <h5>Amount:</h5>
          </Form.Label>
          <Form.Control
            type="text"
            id="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>{" "}
        <Button variant="outline-danger" onClick={onConfirm}>
          Close
        </Button>
      </Form>
    </>
  );
};

export default SendMoneyForm;
