import React, { useState } from "react";
import classes from "./Form.module.scss";
import { NavLink } from "react-router-dom";
const Form = ({
  label,
  username,
  setUsername,
  password,
  setPassword,
  link1,
  link2,
  toggler,
  onSubmit,
}) => {
  const [showPw, setShowPw] = useState(false);
  const checkHandler = (e) => {
    if (e.target.checked) {
      setShowPw(true);
    } else {
      setShowPw(false);
    }
  };
  return (
    <div className={classes["auth-card"]}>
      <div className={classes.comp}>
        <img src="./favicon.png"></img>
        <h1>{label}</h1>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type={showPw ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={classes.showpw}>
          <label>Show Password :</label>
          <input
            type="checkbox"
            placeholder="Password"
            onChange={checkHandler}
          />
        </div>

        <div className={classes.links}>
          {link1 ? <NavLink to="/forgotpw">{link1}</NavLink> : ""}
          <NavLink to={toggler ? "/register" : "/login"}>{link2}</NavLink>
        </div>
        <button type="submit">Lets go!</button>
      </form>
    </div>
  );
};

export default Form;
