import React, { useState } from "react";
import "./Navbar.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

import { NavLink } from "react-router-dom";
const Navbar = () => {
  const [user, setUser] = useState(false);
  const [toggle, setToggle] = useState(false);
  return (
    <div className="navbar">
      <div className="nav-info">
        <img src="./favicon.png"></img>
        <h1>FlavorVerse</h1>
      </div>
      <div className="nav-items">
        {!user ? (
          <>
            <NavLink to="/" className="nav-item">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-item">
              About
            </NavLink>
            {/* <NavLink to="/" className="nav-item">
              Contact
            </NavLink> */}
            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/" className="nav-item">
              Explore
            </NavLink>
            <NavLink to="/" className="nav-item">
              My Recipes
            </NavLink>
            <NavLink to="/" className="nav-item">
              Favourites
            </NavLink>
            <NavLink to="/" className="nav-item">
              Profile
            </NavLink>
            <button>Logout</button>
          </>
        )}
      </div>
      {toggle ? (
        <div className="nav-mobile">
          <div className="mobile-card">
            {!user ? (
              <>
                <NavLink to="/" className="nav-mob">
                  Home
                </NavLink>
                <NavLink to="/about" className="nav-mob">
                  About
                </NavLink>
                {/* <NavLink to="/" className="nav-mob">
                Contact
              </NavLink> */}
                <button>Login</button>
              </>
            ) : (
              <>
                <NavLink to="/" className="nav-mob">
                  Explore
                </NavLink>
                <NavLink to="/" className="nav-mob">
                  My Recipes
                </NavLink>
                <NavLink to="/" className="nav-mob">
                  Favourites
                </NavLink>
                <NavLink to="/" className="nav-mob">
                  Profile
                </NavLink>
                <button>Logout</button>
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
