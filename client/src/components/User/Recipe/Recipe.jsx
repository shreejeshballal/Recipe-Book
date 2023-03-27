import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit, GrFavorite } from "react-icons/gr";
import classes from "./Recipe.module.scss";
import { useLocation } from "react-router-dom";
const Recipe = () => {
  let { state } = useLocation();

  return (
    <div className={classes.container}>
      <div className={classes.topwrap}>
        <div className={classes.left}>
          <div className={classes.title}>
            <h1>{state.name}</h1>
            <span>- {state.userOwner.username}</span>
          </div>

          <div className={classes.topbot}>
            <div className={classes.time}>
              <p>{state.cookingTime}</p>
              <span>Minutes</span>
            </div>

            <div className={classes.hr}></div>
            <div className={classes.icons}>
              <RiDeleteBin6Line />
              <GrEdit />
              <GrFavorite />
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <img src={state.imageUrl}></img>
        </div>
      </div>

      <div className={classes.content}>
        <div>
          <h2>Ingredients Required:</h2>
          <ol>
            {state.ingredients.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>;
            })}
          </ol>
        </div>
        <div>
          <h2>Instructions:</h2>
          <p>{state.instructions}</p>
        </div>

        <button>Back</button>
      </div>
    </div>
  );
};

export default Recipe;
