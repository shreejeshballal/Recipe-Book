import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await RecipeModel.find({}).populate("userOwner");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.create(req.body);
    const user = await UserModel.findByIdAndUpdate(req.body.userOwner, {
      $push: { myRecipes: recipe },
    });
    res.status(200).json({
      title: "Success",
      message: "Recipe added successfully",
      button: "Okay",
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


// router.get("/fav", async (req, res) => {
//   try {

//     const favRecipe = await UserModel.exists({ _id: req.query.userID, favRecipes: req.query.recipeID })
//     if (favRecipe) {
//       res.status(200).json({
//         state: "true"
//       });
//     }
//     else {
//       res.status(200).json({
//         state: "true"
//       });
//     }
//   } catch (err) {
//     res.status(400).json(err);
//   }

// })

router.get("/fav", async (req, res) => {
  try {
    const user = await UserModel.findById(req.query.userID, "username").populate({ path: "favRecipes", populate: "userOwner" })
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
})
router.put("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const favRecipe = await UserModel.exists({ _id: req.body.userID, favRecipes: req.body.recipeID })
    if (favRecipe) {
      const response = await UserModel.findByIdAndUpdate(req.body.userID, {
        $pullAll: {
          favRecipes: [req.body.recipeID],
        }
      })
      res.status(400).send({
        title: "Success",
        message: "Recipe removed from favorites!",
        button: "Okay"
      })
    }
    else {

      const user = await UserModel.findByIdAndUpdate(req.body.userID, {
        $push: { favRecipes: recipe },
      });
      res.status(200).json({ status: "Success", messsage: "Added recipe to favorites!", button: "Okay" });
    }

  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.get("/myRecipes/ids", async (req, res) => {
  console.log(req.body);
  try {
    const user = await UserModel.findById(req.body.userID);
    res.json({ myRecipes: user?.myRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/myRecipes", async (req, res) => {
  try {
    const user = await UserModel.findById(req.query.userID);
    const myRecipes = await RecipeModel.find({
      _id: { $in: user.myRecipes },
    }).populate("userOwner");
    res.status(200).json({ status: "Success", myRecipes: myRecipes });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/myRecipes", async (req, res) => {
  try {
    const recipe = await RecipeModel.findByIdAndDelete(req.query.id);
    res
      .status(200)
      .json({ status: "Success", message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

export { router as recipesRouter };
