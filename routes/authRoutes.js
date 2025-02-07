import express from "express";
import bcrypt from "bcryptjs";
import pool from "../db.js"

const router = express.Router();

router.post("/signup", async (req, res) => {
    const {email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

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

export default router;