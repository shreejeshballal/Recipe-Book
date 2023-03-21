import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
    `mongodb+srv://shreejesh:${process.env.DB_PW}@flavors.vlfdrxx.mongodb.net/flavors?retryWrites=true&w=majority`
);

app.use("/auth", userRouter);


app.listen(3001, () => {
    console.log("Server started!");
});
