import React from "react";
import { NavLink } from "react-router-dom";
import classes from "../Auth.module.scss";
const Login = () => {
  return (
    <div className={`container ${classes.auth}`}>
      <div className={classes["auth-card"]}>
        <div className={classes.comp}>
          <img src="./favicon.png"></img>
          <h1>Login</h1>
        </div>
        <form>
          <input type="text" placeholder="Email" />
          <input type="password" className="auth-pw" placeholder="Password" />
          <div className={classes.bottom}>
            <label htmlFor="checkbox">Show password:</label>
            <input type="checkbox" />
          </div>
          <div className={classes.links}>
            <NavLink to="/forgotpw">Forgot password?</NavLink>
            <NavLink to="/signup">Create a new account!</NavLink>
          </div>
          <button className="submit">Lets go!</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
