import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    myRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
    favRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
});

export const UserModel = mongoose.model('users', userSchema);

