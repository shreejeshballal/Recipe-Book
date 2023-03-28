import React, { useState } from "react";
import classes from "../Auth.module.scss";
import { useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import axios from "axios";
import { useMod } from "../../context/modalContext";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setErr } = useMod();
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
      await axios.post(
        "https://flavour-verse-backend.onrender.com/auth/register",
        {
          username,
          password,
        }
      );
      setErr({
        title: "Registration Successfull!",
        message: "You can now login with your username and password",
        button: "Okay",
      });
      navigate("/login");
    } catch (err) {
      setErr({
        title: "ERROR!",
        message: `${
          err.response ? err.response.data.message : "Cannot connect to server"
        }`,
        button: "Back",
      });
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className={`container ${classes.register}`}>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
        link2="Already registered? Click here!"
        toggler={false}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
