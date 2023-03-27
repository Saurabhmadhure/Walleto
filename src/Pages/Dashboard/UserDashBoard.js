import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardItem from "./DashboardItem";
import "./Dashboard.css";
import "../Home.css";

const UserDashboard = ({ userDetails }) => {
  const [idelBalance, setBalance] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   var name = userDetails?.name;

  var acNo = userDetails?.accNo;
  //   setAccountNo(acNo);
  // }, []);
  useEffect(() => {
    if (idelBalance === 0) {
      setBalance(0);
      return;
    }
    const jwtToken = userDetails?.token;

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`http://localhost:8080/accounts/${acNo}`, { headers })
      .then((response) => {
        var balance = response.data;
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [acNo]);

  useEffect(() => {
    if (userDetails !== null && userDetails !== undefined) {
      setLoggedIn(true);
    }
  }, [userDetails]);

  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <br />
              {loggedIn ? (
                <>
                  <div className="card text-center">
                    <div className="card-header bg-secondary text-white">
                      <h2>Welcome {userDetails?.name}</h2>
                    </div>
                  </div>
                  <hr />
                  <DashboardItem userDetails={userDetails} />
                </>
              ) : (
                <div className="card text-center">
                  <div className="card-header bg-secondary text-white">
                    <h2>Please login or register to continue</h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
