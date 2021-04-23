import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoDB = `mongodb+srv://${process.env.DB_UNAME}:${process.env.DB_PWORD}@cluster0.alxr2.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`;

export const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

export const sessionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export const connection = mongoose.createConnection(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

export const connectDB = async () => {
    mongoose.connect(mongoDB, options);
    const database = mongoose.connection;
    await database.once("open", () => console.log("Database connected"));
};
