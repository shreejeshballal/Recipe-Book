import React from "react";
import classes from "./Modal.module.scss";
import { useMod } from "../context/modalContext";
const MessageModal = () => {
  const { err, setErr } = useMod();
  if (err) {
    return (
      <div className={classes.overlay}>
        <div className={classes.card}>
          <h2>{err.title}</h2>
          <p>{err.message}</p>
          <button onClick={() => setErr(false)}>{err.button}</button>
        </div>
      </div>
    );
  }
};

export default MessageModal;
