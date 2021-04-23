import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hash: String,
    salt: String,
    avatar: { type: String },
    admin: Boolean,
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
