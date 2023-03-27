import React, { useState } from "react";
import classes from "./AddRecipe.module.scss";
import AddRecipeForm from "./AddRecipeForm";
import { useMod } from "../context/modalContext";
import axios from "axios";

const AddRecipe = (props) => {
  if (props.toggle) {
    const { setErr } = useMod();
    const [recipe, setRecipe] = useState({
      name: "",
      ingredients: [""],
      imageUrl: "",
      cookingTime: 0,
      instructions: "",
      userOwner: window.localStorage.getItem("userID"),
    });

    const handleChange = (e) => {
      setRecipe({ ...recipe, [e.target.name]: e.target.value });
    };

    const onAdd = (e) => {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ""],
      });
    };
    const onRemove = (e) => {
      if (recipe.ingredients.length > 1) recipe.ingredients.pop();
      else {
        setErr({
          title: "Operation not allowed",
          message: "Need minimum one ingredient",
          button: "okay",
        });
      }
      setRecipe({ ...recipe, ingredients: [...recipe.ingredients] });
    };
    const onIngredientChange = (e, key) => {
      const ingredients = recipe.ingredients;
      ingredients[key] = e.target.value;
      setRecipe({ ...recipe, ingredients: ingredients });
    };

    const onReset = (event) => {
      setRecipe({
        name: "",
        imageUrl: "",
        ingredients: [""],
        cookingTime: 0,
        instructions: "",
        userOwner: window.localStorage.getItem("userID"),
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (
        recipe.name.trim().length > 1 &&
        recipe.imageUrl.trim().length > 1 &&
        recipe.instructions.trim().length > 1 &&
        recipe.ingredients[0].length > 1 &&
        recipe.cookingTime > 0
      ) {
        try {
          const response = await axios.post(
            "http://localhost:3001/recipes",
            recipe
          );
          props.setTog(false);
          // setErr(response.data);
        } catch (err) {
          console.log(err);
          setErr({
            title: "Failed",
            message: "Recipe already exists under this user",
            button: "Okay",
          });
        }
      } else {
        setErr({
          title: "Insufficient data",
          message: "Please fill all the details",
          button: "Okay",
        });
      }
    };

    return (
      <div className={classes.overlay}>
        <div className={classes.card}>
          <h1 className={classes.title}>Add Recipe</h1>
          <AddRecipeForm
            onChange={handleChange}
            onSubmit={handleSubmit}
            onAdd={onAdd}
            onRemove={onRemove}
            recipe={recipe}
            ingChange={onIngredientChange}
            onReset={onReset}
          />
        </div>
      </div>
    );
  }
};

export default AddRecipe;
