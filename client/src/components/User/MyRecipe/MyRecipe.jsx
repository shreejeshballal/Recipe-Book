import React, { useState } from "react";
import classes from "./MyRecipe.module.scss";
// import {AddRecipe}

import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import AddRecipe from "../../Modals/AddRecipe";

const MyRecipe = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={classes.container}>
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
      <AddRecipe toggle={toggle} />
    </div>
  );
};

export default MyRecipe;
