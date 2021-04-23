import UserModel from "../model/user.model.js";
import { generatePassword, validatePassword } from "../utils/passwordUtils.js";

export const userLogin = async (username, password, done) => {
    try {
        const user = await UserModel.findOne({ username });

        if (!user) return done(null, false, { message: "Invalid credentials" });

        const isValid = validatePassword(password, user.hash, user.salt);

        if (!isValid)
            return done(null, false, { message: "Invalid credentials" });

        return done(null, user);
    } catch (error) {
        return done(error);
    }
};

export const userDeserialized = async (id, done) => {
    await UserModel.findById(id, (err, user) => {
        done(err, user);
    });
};

export const userSerialized = (user, done) => {
    done(null, user.id);
};

export const userRegister = async (req, res) => {
    try {
        const saltHash = generatePassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const User = await new UserModel({
            username: req.body.username,
            email: req.body.email,
            hash,
            salt,
        });

        await User.save();

        return res.status(200).json({ message: "Registration Complete" });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        req.flash("error", "test");
        return res.status(200).json({
            users,
            message: req.flash("info"),
        });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

export const userLogout = (req, res) => {
    req.logout();
    return res.status(200).json({ message: "User has been logged out" });
};

export const getUserById = async (req, res) => {
    try {
        const _id = req.params._id;
        const user = await UserModel.findById({ _id });

        if (!user || user === null) {
            res.status(404).json({ message: "User not found" });
        }

        if (req.params._id !== req.user._id.toString()) {
            res.status(401).json({ message: "Access unauthorized" });
        }

        return res.status(200).json({ payload: user });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const deleteUser = async (req, res) => {
    try {
        if (req.params._id !== req.user._id.toString()) {
            res.status(401).json({ message: "Access unauthorized" });
        }

        const user = await UserModel.deleteOne({ _id: req.params._id });
        //req.logout();
        return res.status(200).json({ message: user });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
