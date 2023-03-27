import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { toast, ToastContainer } from "react-toastify";
import { Dropdown, DropdownButton } from "react-bootstrap";
import SignInModel from "./Modals/SignUpModal";
import LoginModel from "./Modals/LoginModel";

const NavigationBar = ({ handleUserInfo, userDetails }) => {
  const [uname, setUname] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [signModalShow, setSignModalShow] = useState(false);

  useEffect(() => {
    var name = userDetails?.name;
    setUname(name);

    // console.log(userDetails.name);
    var acNo = userDetails?.accNo;
  }, [userDetails]);

  const Logout = () => {
    localStorage.clear();

    window.location.href = "/";
    toast.success("Successfully Logged Out");
  };

  localStorage.setItem("userName", uname);
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUname(savedName);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-2">
      <div className="container-fluid  d-flex align-items-center">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link mt-1" href="/home">
              <strong>
                <h2>Walleto</h2>
              </strong>{" "}
            </a>
          </li>
        </ul>

        <Navbar.Collapse className="justify-content-end">
          <div className="d-flex justify-content-center align-items-center">
            {uname ? (
              <DropdownButton id="dropdown-basic-button" title={uname}>
                <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
              </DropdownButton>
            ) : (
              <>
                <button
                  className="btn btn-outline-light mx-2"
                  onClick={() => setModalShow(true)}>
                  {uname ? uname : "Login"}
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={() => setSignModalShow(true)}>
                  {uname ? uname : "Sign up"}
                </button>
              </>
            )}
          </div>
          <LoginModel
            handleUserInfo={(user) => {
              setUname(user.name);

              handleUserInfo(user);
            }}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <SignInModel
            handleUserInfo={(user) => {
              setUname(user.name);
              console.log(user);
              handleUserInfo(user);
            }}
            show={signModalShow}
            onHide={() => setSignModalShow(false)}
          />
        </Navbar.Collapse>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </nav>
  );
};

export default NavigationBar;
