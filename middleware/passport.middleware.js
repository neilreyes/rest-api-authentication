import passport from "passport";
import LocalStrategy from "passport-local";
import {
    userLogin,
    userSerialized,
    userDeserialized,
} from "../controller/user.controller.js";

const strategy = new LocalStrategy(userLogin);

passport.serializeUser(userSerialized);

passport.deserializeUser(userDeserialized);

passport.use(strategy);

export default passport;
