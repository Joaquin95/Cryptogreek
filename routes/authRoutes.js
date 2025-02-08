import express from "express";
import bcrypt from "bcryptjs";
import pool from "../db.js"

const router = express.Router();

router.post("/signup", async (req, res) => {
    const {email, password} = req.body;

    try {
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if(userExists.rows.length > 0 ) {
            return res.status(400).json({ error: "Email already in use"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
            email, hashedPassword,
        ]);

        res.status(201).json({ message: "User registered successfully!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "server error"});
    }
});


router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        // Fetch user from PostgreSQL
        const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Normally, you should generate a JWT token here
        res.json({ message: "Login successful!", token: "dummy-jwt-token" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


export default router;