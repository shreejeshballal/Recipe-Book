import Navbar from "./components/Navbar/Navbar";
import React, { useState, useEffect } from "react";

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/Main/About/About";
import Home from "./components/Main/Home/Home";
import Login from "./components/Authentication/Login/Login";

function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
