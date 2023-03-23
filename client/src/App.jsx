import Navbar from "./components/Navbar/Navbar";
import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/Main/About/About";
import Home from "./components/Main/Home/Home";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";
import ModalProvider from "./components/context/modalContext";
import MessageModal from "./components/Modals/MessageModal";
import Explore from "./components/User/Explore/Explore";
import Fav from "./components/User/FavRecipe/Fav";
import MyRecipe from "./components/User/MyRecipe/MyRecipe.jsx";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(["access_token"]);
  return (
    <BrowserRouter>
      <ModalProvider>
        <Navbar />
        <Routes>
          {!cookies.access_token ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route path="/explore" element={<Explore />} />
              <Route path="/myrecipes" element={<MyRecipe />} />
              <Route path="/fav" element={<Fav />} />
              {/* <Route path="/profile" element={<Register />} /> */}
            </>
          )}
        </Routes>
        <MessageModal />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
