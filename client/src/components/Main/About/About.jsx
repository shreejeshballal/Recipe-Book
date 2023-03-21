import React from "react";
import classes from "./About.module.scss";
const About = () => {
  return (
    <div className={`container ${classes.about} `} id="about">
      <h1>About</h1>
      <div className={classes.info}>
        <div className={classes.image}>
          <img src="./images/about.jpg" />
        </div>
        <p>
          A place where you can find a wide range of delicious recipes for every
          taste and occasion! Our mission is to help home cooks and food lovers
          discover new and exciting dishes, as well as to provide inspiration
          and guidance for those who want to experiment in the kitchen.
        </p>
      </div>
    </div>
  );
};

export default About;
