import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authroutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());

//Cors confi for frontend 
const corsOptions = {
    origin: "http://localhost:5173", //frontend origin
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
};

app.use(cors(corsOptions));


//routes
app.use("/api/auth", authroutes);


app.get("/", (req, res) => {
    res.send("Welcome to the Cryptogreek API Test");
});

//MongoBD Connection
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));