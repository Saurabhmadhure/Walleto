import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useState } from "react";

const OTPNavbar = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo");
    if (userInfoFromStorage) {
      setUserInfo(JSON.parse(userInfoFromStorage));
    }
  }, []);
  const handleUserInfo = (data) => {
    setUserInfo(data);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-2">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <a className="navbar-brand mt-1">
          <strong>
            <h2>Walleto</h2>
          </strong>
        </a>
      </div>
    </nav>
  );
};

export default OTPNavbar;
