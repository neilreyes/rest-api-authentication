import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import flash from "connect-flash";
import session from "express-session";
// import MongoStore from "connect-mongo";
import userRoute from "./routes/api/v1/user.route.js";
import profileRoute from "./routes/api/v1/profile.route.js";
import travelRoute from "./routes/api/v1/travellogs.route.js";

import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import passport from "./middleware/passport.middleware.js";

import { connectDB } from "./database/database.js";

const app = express();

dotenv.config();
connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
    app.use((req, res, next) => {
        console.log("Session: ", req.session);
        console.log("User: ", req.user);
        next();
    });
}

app.use(flash());

// Routers
app.use("/api/v1/user", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/travellogs", travelRoute);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () =>
    console.log(`Server running on http://localhost:${process.env.PORT}`)
);
