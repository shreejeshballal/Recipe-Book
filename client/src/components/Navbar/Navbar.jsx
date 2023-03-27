import React, { useState } from "react";
import "./Navbar.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { useMod } from "../context/modalContext";
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleLogin, setToggleLogin] = useState("login");
  const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);
  const logout = () => {
    removeCookies("access_token");
    window.localStorage.removeItem("userID");
    setToggle(false);
    setToggleLogin("login");
  };
  return (
    <div className="navbar">
      <div className="nav-info">
        <img src="./favicon.png"></img>
        <h1>FlavorVerse</h1>
      </div>
      <div className="nav-items">
        {!cookies.access_token ? (
          <>
            <NavLink
              to="/"
              className="nav-item"
              onClick={(e) => setToggleLogin("login")}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="nav-item"
              onClick={(e) => setToggleLogin("login")}
            >
              About
            </NavLink>
            {toggleLogin === "login" ? (
              <NavLink to="/login" onClick={(e) => setToggleLogin("register")}>
                <button>Login</button>
              </NavLink>
            ) : (
              <NavLink to="/register" onClick={(e) => setToggleLogin("login")}>
                <button>Register</button>
              </NavLink>
            )}
          </>
        ) : (
          <>
            <NavLink to="/" className="nav-item">
              Explore
            </NavLink>
            <NavLink to="/myrecipes" className="nav-item">
              My Recipes
            </NavLink>
            <NavLink to="/fav" className="nav-item">
              Favourites
            </NavLink>
            {/* <NavLink to="/" className="nav-item">
              Profile
            </NavLink> */}
            <NavLink to="/">
              <button onClick={logout}>Logout</button>
            </NavLink>
          </>
        )}
      </div>
      {toggle ? (
        <div className="nav-mobile">
          <div className="mobile-card">
            {!cookies.access_token ? (
              <>
                <NavLink
                  to="/"
                  className="nav-mob"
                  onClick={() => {
                    setToggle(false);
                    setToggleLogin("login");
                  }}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className="nav-mob"
                  onClick={() => {
                    setToggle(false);
                    setToggleLogin("login");
                  }}
                >
                  About
                </NavLink>

                {toggleLogin === "login" ? (
                  <NavLink
                    to="/login"
                    onClick={(e) => {
                      setToggleLogin("register");
                      setToggle(false);
                    }}
                  >
                    <button>Login</button>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/register"
                    onClick={(e) => {
                      setToggleLogin("login");
                      setToggle(false);
                    }}
                  >
                    <button>Register</button>
                  </NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  className="nav-mob"
                  onClick={() => setToggle(false)}
                >
                  Explore
                </NavLink>
                <NavLink
                  to="/myrecipes"
                  className="nav-mob"
                  onClick={() => setToggle(false)}
                >
                  My Recipes
                </NavLink>
                <NavLink
                  to="/fav"
                  className="nav-mob"
                  onClick={() => setToggle(false)}
                >
                  Favourites
                </NavLink>
                {/* <NavLink
                  to="/"
                  className="nav-mob"
                  onClick={() => setToggle(false)}
                >
                  Profile
                </NavLink> */}
                <NavLink to="/">
                  <button onClick={logout}>Logout</button>
                </NavLink>
              </>
            )}
          </div>
          <AiOutlineClose
            className={`close`}
            onClick={() => setToggle(false)}
          />
        </div>
      ) : (
        ""
      )}
      <GiHamburgerMenu
        className={`ham ${toggle ? "" : "active"}`}
        onClick={() => setToggle(true)}
      />
    </div>
  );
};

export default Navbar;
