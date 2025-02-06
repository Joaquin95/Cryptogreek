import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authroutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(cors());


//routes
app.use("/api/auth", authroutes);


app.get("/", (req, res) => {
    res.send("Welcome to the Cryptogreek API");
});

//MongoBD Connection
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));