import React from "react";
import classes from "./AddRecipeForm.module.scss";
const AddRecipeForm = (props) => {
  return (
    <form onSubmit={props.onSubmit} className={classes.onForm}>
      <div className={classes.inputContainer}>
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          name="name"
          placeholder="Recipe name"
          value={props.recipe.name}
          onChange={props.onChange}
        />
      </div>
      <div className={classes.inputContainer}>
        <label htmlFor="imageUrl">Image :</label>
        <input
          type="text"
          name="imageUrl"
          value={props.recipe.imageUrl}
          placeholder="Image url"
          onChange={props.onChange}
        />
      </div>

      <div className={classes.inputContainer}>
        <label htmlFor="time">Time :</label>
        <input
          type="number"
          name="cookingTime"
          value={props.recipe.cookingTime}
          placeholder="Cooking time in mins"
          onChange={props.onChange}
        />
      </div>
      <div className={classes.inputContainer}>
        <label htmlFor="ingredient">Ingredients :</label>
        <div className={classes.ingredients}>
          {props.recipe?.ingredients?.map((ingredient, key) => {
            return (
              <input
                type="text"
                name="ingredients"
                placeholder="Ingredients required "
                value={ingredient}
                onChange={(e) => props.ingChange(e, key)}
                key={key}
              />
            );
          })}
        </div>
      </div>
      <div className={classes.buttons}>
        <button onClick={props.onAdd} type="button">
          Add
        </button>
        <button onClick={props.onRemove} type="button">
          Remove
        </button>
      </div>
      <div className={classes.inputContainer}>
        <label htmlFor="instructions">Instructions :</label>
        <textarea
          type="text"
          value={props.recipe.instructions}
          name="instructions"
          placeholder="Instructions to cook"
          onChange={props.onChange}
        />
      </div>
      <div className={classes.buttons}>
        <button type="button" onClick={props.onReset}>
          Reset
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddRecipeForm;
