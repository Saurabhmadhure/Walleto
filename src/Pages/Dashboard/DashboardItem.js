import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "../../Component/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import SendMoneyForm from "../MoneyTransfer/SendMoney";
import Modal from "../MoneyTransfer/Modal";
import DepositForm from "./Deposit";

const DashboardItem = ({ userDetails, handleBalance }) => {
  const [balance, setBalance] = useState(null);
  const [balanceAvailable, setBalanceAvailable] = useState(null);
  const [showBalance, setShowBalance] = useState(false);
  const [cashback, setCashback] = useState(null);

  const [showDepositContainer, setShowDepositContainer] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };
  const navigate = useNavigate();

  var acNo = userDetails?.accNo;
  const jwtToken = userDetails?.token;

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json",
  };
  useEffect(() => {
    const fetchCashback = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/accounts/cashback/${acNo}`,
          { headers }
        );

        setCashback(response.data);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchCashback();
  }, [acNo]);

  const balAvailable = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/accounts/${acNo}`,
        { headers }
      );
      setBalance(response.data.availableBalance);
      setShowDepositContainer(false);
      setBalanceAvailable(true);
    } catch (error) {
      console.log(error);
    }
  };

  const errorHandler = () => {
    setModalOpen(false);
  };
  const handleDepositClick = () => {
    setShowDepositContainer(!showDepositContainer);
  };
  const handleBalanceClick = async () => {
    setShowBalance(!showBalance);
    if (!balanceAvailable) {
      try {
        const response = await axios.get(
          `http://localhost:8080/accounts/${acNo}`,
          {
            headers,
          }
        );
        setBalanceAvailable(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (userDetails) {
      balAvailable();
    }
  }, [userDetails]);
  const handleDepositSuccess = (data) => {
    setBalance(data);
  };

  const handleClick = () => {
    navigate("/home/transaction", { state: { userDetails: userDetails } });
  };

  return (
    <>
      <Card>
        <Container>
          <div className="row">
            <div className="col-lg-4 col-md-1 col-1">
              <br />

              <h5>Account Number</h5>
              <h2>
                <strong>{acNo}</strong>
              </h2>
            </div>
            <div className="col-lg-3 col-md-3 col-6 text-center">
              <Button variant="secondary" onClick={handleBalanceClick}>
                {showBalance ? "Hide Balance" : "Show Balance"}
              </Button>

              {showBalance && <h2>₹{balance}</h2>}
            </div>
            <div className="d-grid gap-3 col-lg-3  col-md-3 mx-auto mt-1">
              <ul className="list-group">
                <Button variant="outline-primary" onClick={handleClick}>
                  View Transactions
                </Button>

                <ul className="list-group mt-1">
                  <Button
                    variant="outline-success"
                    onClick={handleDepositClick}>
                    Deposit Amount
                  </Button>
                </ul>
                {showDepositContainer && (
                  <DepositForm
                    userDetails={userDetails}
                    handleDepositSuccess={handleDepositSuccess}
                    balanceAvailable={balanceAvailable}
                  />
                )}
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  className="mt-2">
                  Send Money
                </Button>
              </ul>
            </div>
          </div>

          {modalOpen && (
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={modalOpen}
              onHide={handleClose}
              title="Send Money"
              // setOpenModal={setModalOpen}
              onConfirm={errorHandler}>
              <br />
              <SendMoneyForm
                onConfirm={errorHandler}
                setOpenModal={setModalOpen}
                userDetails={userDetails}>
                Send Money
              </SendMoneyForm>
            </Modal>
          )}
        </Container>
        {cashback > 0 && (
          <div className="position-fixed bottom-0 end-0 m-3">
            <div className="bg-light p-3 rounded">
              <h4 className="mb-3">Total Cashback Earned</h4>
              <h3 className="mb-0">
                <strong>₹{cashback}</strong>
              </h3>
            </div>
          </div>
        )}
      </Card>
    </>
  );
};

export default DashboardItem;
