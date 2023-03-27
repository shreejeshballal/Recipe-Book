import React, { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import classes from "./MyRecipe.module.scss";
// import {AddRecipe}

import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import AddRecipe from "../../Modals/AddRecipe";
import { Link, Outlet } from "react-router-dom";

const MyRecipe = () => {
  const [myRecipes, setMyRecipes] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const fetechrecipe = async () => {
      try {
        const userID = window.localStorage.getItem("userID");
        const response = await axios.get(
          "http://localhost:3001/recipes/myRecipes?userID=" + userID
        );
        console.log(response); 
        console.log(response.data.myRecipes);
        setMyRecipes(response.data.myRecipes);
      } catch (err) {
        console.log(err);
      }
    };
    fetechrecipe();
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.cardwrapper}>
        {myRecipes?.map((recipe, index) => {
          return (
            <div className={classes.card} key={index}>
              <div className={classes.image}>
                <img src={recipe.imageUrl} alt={recipe.name} />
              </div>
              
              <div className={classes.content}>
                <h2>{recipe.name}</h2>
                <div className={classes.bot}>
                  <p>
                    <AiFillClockCircle className={classes.icon} />
                    {recipe.cookingTime} mins
                  </p>
                  <Link to={`/myrecipes/${recipe.name}`} state={recipe}>
                    <button>Know more </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {toggle ? (
        <AiOutlineClose
          className={classes.addItem}
          onClick={() => setToggle(false)}
        />
      ) : (
        <AiOutlinePlus
          className={classes.addItem}
          onClick={() => setToggle(true)}
        />
      )}
      <AddRecipe toggle={toggle} setTog={setToggle} />
    </div>
  );
};

export default MyRecipe;
