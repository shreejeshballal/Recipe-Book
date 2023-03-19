import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Home.module.scss";
const Home = () => {
  return (
    <div className={`container ${classes.home}`} id="home">
      <div className={classes.content}>
        <h1>FlavorVerse - Explore the World of Tasty Recipes</h1>
        <p>
          Welcome to FlavorVerse, the ultimate recipe book website that takes
          you on a culinary journey across the globe!
        </p>
        <NavLink to="/about">
          <button className={classes.button}>Know more</button>
        </NavLink>
      </div>
      <div className={classes.img}>
        <img src="./images/home.jpg"></img>
      </div>
    </div>
  );
};

export default Home;
