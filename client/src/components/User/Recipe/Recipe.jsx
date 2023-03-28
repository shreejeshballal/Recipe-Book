import React from "react";
import axios from "axios";

import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillHeart } from "react-icons/Ai";
import { GrEdit, GrFavorite } from "react-icons/gr";
import classes from "./Recipe.module.scss";
import { useMod } from "../../context/modalContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const Recipe = () => {
  let { state } = useLocation();
  const navigate = useNavigate();
  const { setErr } = useMod();
  const { id } = useParams();

  const deleteRecipe = async () => {
    try {
      const confirmation = window.confirm("Do you want to delete?");
      if (confirmation) {
        const response = await axios.delete(
          "http://localhost:3001/recipes/myRecipes?id=" + id
        );
        setErr({
          title: "Success",
          message: "Deleted the recipe successfully",
          button: "Okay",
        });
      } else {
        return;
      }
    } catch (e) {
      setErr({
        title: "Failed",
        message: e.message,
        button: "Okay",
      });
    }
  };

  const favRecipe = async () => {
    try {
      console.log("hi");
      const recipeID = id;
      const userID = window.localStorage.getItem("userID");
      console.log(recipeID, userID);
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID: recipeID,
        userID: userID,
      });
      console.log(response);
      setErr({
        title: "Success",
        message: "Added to favorites!",
        button: "Okay",
      });
    } catch (e) {
      setErr(e.response.data);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.topwrap}>
        <div className={classes.left}>
          <div className={classes.title}>
            <h1>{state.recipe.name}</h1>
            <span>- {state.recipe.userOwner.username}</span>
          </div>

          <div className={classes.topbot}>
            <div className={classes.time}>
              <p>{state.recipe.cookingTime}</p>
              <span>Minutes</span>
            </div>

            <div className={classes.hr}></div>
            <div className={classes.icons}>
              {state.ownRecipe ? (
                <div onClick={deleteRecipe}>
                  <RiDeleteBin6Line />
                </div>
              ) : null}
              {/* <GrEdit /> */}
              <div onClick={favRecipe}>
                <AiFillHeart />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <img src={state.recipe.imageUrl}></img>
        </div>
      </div>

      <div className={classes.content}>
        <div>
          <h2>Ingredients Required:</h2>
          <ol>
            {state.recipe.ingredients.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>;
            })}
          </ol>
        </div>
        <div>
          <h2>Instructions:</h2>
          <p>{state.recipe.instructions}</p>
        </div>

        <button
          onClick={() => {
            navigate("/myrecipes");
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Recipe;
