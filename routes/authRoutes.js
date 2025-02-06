import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) =>{
    const { username, email, password, confirmPassword} = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.json({message: "User registered successfully!" });
    } catch(error) {
        res.status(500).json({error: "Server error"});
    }
});

export default router;