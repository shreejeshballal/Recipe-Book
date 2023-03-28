import React, { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "./Explore.module.scss";

import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import AddRecipe from "../../Modals/AddRecipe";
import { Link, Outlet } from "react-router-dom";

const Explore = () => {
  const [myRecipes, setMyRecipes] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [filterdRecipe, setFilterdRecipe] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetechrecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        console.log(response);
        setMyRecipes(response.data);
        console.log(myRecipes);
        setFilterdRecipe(response.data);
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
      <h1>Explore</h1>
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

export default Explore;
