import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await UserModel.findOne({ username: username });
  console.log(user);
  if (user) {
    return res.status(400).json({
      status: "failed",
      message: "User already exists!",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    username,
    password: hashedPassword,
  });
  res.status(200).json({
    status: "success",
    message: "User registered successfully",
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });
  if (!user) {
    return res
      .status(400)
      .json({ status: "Error", message: "User does not Exist!" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ status: "Error", message: "Invalid password! Try again." });
  }
  const token = jwt.sign({ id: user._id }, process.env.BCRYPT_SECRET);
  res.status(200).json({
    status: "Successfully logged In!",
    message: "Have fun cooking with the recipes.",
    token: token,
    userID: user.username,
  });
});

router.post("/login");
export { router as userRouter };
