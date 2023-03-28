import React from "react";
import classes from "./Error.module.scss";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.error}>
      <h1> 404</h1>
      <h2>Oops, Page not found!</h2>
      <p>Got lost looking at the recipes? Click the button below!</p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Error;
