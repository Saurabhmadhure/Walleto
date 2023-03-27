import React from "react";
import classes from "./Wallet.module.css";

const WalletCard = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default WalletCard;
