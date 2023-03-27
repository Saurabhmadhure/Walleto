import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../Component/Base";
import Card from "../Component/Card";

function OTP() {
  const [otp, setOtp] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo");
    if (userInfoFromStorage) {
      setUserInfo(JSON.parse(userInfoFromStorage));
      console.log(userInfoFromStorage);
    }
  }, []);
  const handleUserInfo = (data) => {
    setUserInfo(data);
  };

  const navigate = useNavigate();
  const handleActivateAccount = () => {
    setShowOtpForm(true);
  };
  const handleOtpSubmit = (event) => {
    event.preventDefault();
    var email = localStorage.getItem("email");

    console.log(otp);
    axios
      .post("http://localhost:8080/users/verify", {
        email: email,
        userEnteredOTP: otp,
      })
      .then((otpResponse) => {
        console.log(otpResponse);
        if (otpResponse.data === true) {
          console.log();
          toast.success("Succesfully Registered");
          navigate("/home");
          setOtp("");
        } else {
          console.log({
            userEnteredOTP: otp,
            email: email,
          });
          setOtp("");

          toast.error("Invalid Otp. Please try again");
        }
      });
  };

  return (
    <>
      <Base />
      <div>
        {!showOtpForm && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}>
            <h1 style={{ marginBottom: "1rem" }}>Inactive Account</h1>
            {!showOtpForm && (
              <Button variant="primary" onClick={handleActivateAccount}>
                Activate Account
              </Button>
            )}
            {showOtpForm && (
              <Card>
                <Form
                  bg="dark"
                  variant="dark"
                  onSubmit={handleOtpSubmit}></Form>
              </Card>
            )}
          </div>
        )}
        {showOtpForm && (
          <Card>
            <h1 align="center">Activate Your Account</h1>
            <Form bg="dark" variant="dark" onSubmit={handleOtpSubmit}>
              <Form.Group className="mb-1">
                <Form.Label>
                  Insert OTP Enter Otp Received on Registered mail
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Otp"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                />
                <Form.Text className="text-muted">Activate Account</Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card>
        )}
      </div>
    </>
  );
}

export default OTP;
