import React, { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "./Fav.module.scss";
// import {AddRecipe}

import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import AddRecipe from "../../Modals/AddRecipe";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Fav = () => {
  const navigate = useNavigate();
  const [myRecipes, setMyRecipes] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [filterdRecipe, setFilterdRecipe] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetechrecipe = async () => {
      try {
        const userID = window.localStorage.getItem("userID");
        const response = await axios.get(
          "https://flavour-verse-backend.onrender.com/recipes/fav?userID=" +
            userID
        );
        console.log(response.data);

        setMyRecipes(response.data.favRecipes);
        setFilterdRecipe(response.data.favRecipes);
      } catch (err) {
        console.log(err);
      }
    };
    fetechrecipe();
  }, []);

  useEffect(() => {
    setFilterdRecipe(
      myRecipes?.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput?.toLowerCase());
      })
    );
  }, [searchInput]);
  return (
    <div className={classes.container}>
      <h1>Favorites</h1>
      {filterdRecipe?.length > 0 ? (
        <>
          <div className={classes.searchBar}>
            <input
              type="text"
              placeholder="Search for recipe"
              onChange={(e) => setSearchInput(e.target.value)}
            ></input>
            <AiOutlineSearch className={classes.icon} />
          </div>
          <div className={classes.cardwrapper}>
            {filterdRecipe?.map((recipe, index) => {
              return (
                <div className={classes.card} key={index}>
                  <div className={classes.image}>
                    <img src={recipe.imageUrl} alt={recipe.name} />
                  </div>

                  <div className={classes.content}>
                    <h2>{recipe.name}</h2>
                    <p>- By {recipe.userOwner.username}</p>
                    <div className={classes.bot}>
                      <p>
                        <AiFillClockCircle className={classes.icon} />
                        {recipe.cookingTime} mins
                      </p>
                      <Link
                        to={`/myrecipes/${recipe._id}`}
                        state={{
                          recipe: recipe,
                          ownRecipe: false,
                        }}
                      >
                        <button>Know more </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className={classes.noFav}>
          <img src="./images/ramen.png"></img>
          <h1>
            No favorites added! Start exploring the recipes by clicking the
            button below.
          </h1>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Explore
          </button>
        </div>
      )}

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

export default Fav;
