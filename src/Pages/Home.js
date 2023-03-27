import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Base from "../Component/Base";
import UserDashboard from "./Dashboard/UserDashBoard";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo");
    if (userInfoFromStorage) {
      setUserInfo(JSON.parse(userInfoFromStorage));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  const handleUserInfo = (data) => {
    setUserInfo(data);
  };
  return (
    <>
      <Base handleUserInfo={handleUserInfo} userDetails={userInfo} />
      <UserDashboard userDetails={userInfo} />
      <Outlet />
    </>
  );
};

export default Home;
