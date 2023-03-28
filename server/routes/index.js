import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config({ path: "./config.env" });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose.connect(
    `mongodb+srv://shreejesh:${process.env.DB_PW}@flavors.vlfdrxx.mongodb.net/flavors?retryWrites=true&w=majority`
);

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter)

app.listen(3001, () => {
    console.log("Server started!");
});
