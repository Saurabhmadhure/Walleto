import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/home");
  };
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Walleto</h1>
        <p>Your One-Stop Solution for All Your Financial Needs</p>
        <button onClick={handleButtonClick}>Access your walleto</button>
      </div>
    </div>
  );
}

export default HomePage;
