import React from "react";
import Button from "react-bootstrap/esm/Button";
import WalletCard from "../../Component/WalletCard";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />

      <WalletCard className={classes.modal} style={{ textAlign: "left" }}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        {props.children}
      </WalletCard>
    </div>
  );
};

export default Modal;
