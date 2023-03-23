import React from "react";
import classes from "./AddRecipe.module.scss";
const AddRecipe = (props) => {
  if (props.toggle) {
    return (
      <div className={classes.overlay}>
        <div className={classes.card}>
          <h1 className={classes.title}>Add Recipe</h1>
       
            <form>
              <div className={classes.inputContainer}>
                <label htmlFor="name">Name :</label>
                <input type="text" name="name" placeholder="Recipe name" />
              </div>
              <div className={classes.inputContainer}>
                <label htmlFor="imageUrl">Image :</label>
                <input type="text" name="imageUrl" placeholder="Image url" />
              </div>

              <div className={classes.inputContainer}>
                <label htmlFor="imageUrl">Time:</label>
                <input
                  type="number"
                  name="cookingTime"
                  placeholder="Cooking time in mins"
                />
              </div>
              <div className={classes.inputContainer}>
                <label htmlFor="imageUrl">Ingredients :</label>
                <input
                  type="text"
                  name="Ingredients"
                  placeholder="Ingredients required "
                />
                <div className={classes.buttons}>
                  <button>Add</button>
                  <button>Remove</button>
                </div>
              </div>
              <div className={classes.inputContainer}>
                <label htmlFor="imageUrl">Instructions :</label>
                <textarea
                  type="text"
                  name="instructions"
                  placeholder="Instructions to cook"
                />
              </div>
              <div className={classes.buttons}>
                <button>Submit</button>
                <button>Reset</button>
              </div>
            </form>
         
        </div>
      </div>
    );
  }
};

export default AddRecipe;
