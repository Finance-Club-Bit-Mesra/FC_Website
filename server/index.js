import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const mongoURI = process.env.DB;

mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log(err));

app.use(cors()) ;
app.use(express.json());

app.use((err, req, res, next) => {
    console.log(err);
    next();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});