import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Extension .js lagana zaroori hai
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// SIGN UP
router.get("/test", verifyToken, (req, res) => {
    res.status(200).json("Welcome! Your token is valid. Your ID is: " + req.user.id);
});
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(201).json("User created successfully!");
    } catch (err) {
        res.status(500).json(err);
    }
});

// SIGN IN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json("User not found!");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json("Wrong password!");

        // Use secret key from your .env file
        const token = jwt.sign(
    { id: user._id }, 
    process.env.JWT_SEC, // Yeh value seedha .env file se aayegi
    { expiresIn: "3d" }  // Token 3 din tak valid rahega
);
        
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, token });
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router; 