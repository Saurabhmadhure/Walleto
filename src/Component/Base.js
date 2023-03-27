import React, { useState } from "react";
import NavigationBar from "../Pages/AfterLoginNavigationBar";

const Base = ({ handleUserInfo, userDetails }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoggedInStatus = (status) => {
    setLoggedIn(status);
  };
  return (
    <>
      <NavigationBar
        handleUserInfo={handleUserInfo}
        userDetails={userDetails}
      />
    </>
  );
};
export default Base;
