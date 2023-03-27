import React, { useState } from "react";
import classes from "../Auth.module.scss";
import Form from "../Form/Form";
import { useMod } from "../../context/modalContext";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const { setErr } = useMod();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (username.trim().length < 6 || password.trim().length < 6) {
      setUsername("");
      setPassword("");
      return setErr({
        title: "Invalid Username or Password",
        message: "The username and password must be at least 6 characters",
        button: "Okay",
      });
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);

      setErr({
        title: response.data.status,
        message: response.data.message,
        button: "Okay",
      });
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (err) {
      setErr({
        title: "ERROR!",
        message: `${
          err.response ? err.response.data.message : "Cannot connect to server"
        }`,
        button: "Okay",
      });
      setPassword("");
    }
  };

  return (
    <div className={`container ${classes.login}`}>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        link2="New user? Click here!"
        toggler={true}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
