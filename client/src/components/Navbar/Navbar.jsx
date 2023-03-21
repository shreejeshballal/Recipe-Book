import React, { useState } from "react";
import "./Navbar.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { useMod } from "../context/modalContext";
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { setErr } = useMod();
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);
  const logout = () => {
    removeCookies("access_token");
    window.localStorage.removeItem("userID");

    navigate("/");
    setToggle(false);
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
            <NavLink to="/" className="nav-item">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-item">
              About
            </NavLink>

            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/browse" className="nav-item">
              Explore
            </NavLink>
            <NavLink to="/recipes" className="nav-item">
              My Recipes
            </NavLink>
            <NavLink to="/fav" className="nav-item">
              Favourites
            </NavLink>
            {/* <NavLink to="/" className="nav-item">
              Profile
            </NavLink> */}
            <button onClick={logout}>Logout</button>
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
                  onClick={() => setToggle(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className="nav-mob"
                  onClick={() => setToggle(false)}
                >
                  About
                </NavLink>

                <NavLink to="/login">
                  <button onClick={() => setToggle(false)}>Login</button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/browse"
                  className="nav-mob"
                  onClick={() => setToggle(false)}
                >
                  Explore
                </NavLink>
                <NavLink
                  to="/recipes"
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
                <NavLink to="/login">
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
