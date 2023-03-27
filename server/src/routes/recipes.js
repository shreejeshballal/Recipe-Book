import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await RecipeModel.find({});
    res.json(data);
  } catch (err) {
    res.json(err);
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

router.put("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findByIdAndUpdate(req.body.userID, {
      $push: { favRecipes: recipe },
    });
    res.json({ favRecipes: user.favRecipes });
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

export { router as recipesRouter };
