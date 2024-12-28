import User from "../models/User.model.js";
import { registers } from "../services/user.service.js";
import { validationResult } from "express-validator";
import redis from "../services/redis.service.js";

export const register = async (req, res) => {   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { userName, email, password } = req.body;
        const user = await registers({ userName, email, password });
        const token = user.generateToken();
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    console.log("login");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { userName,password } = req.body;
        const user = await User.findOne({ userName }).select("+password");
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        const isMatch = await user.isPasswordMatch(password);
        if (!isMatch) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        const token = user.generateToken();
        res.status(200).json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}


export const profile = async (req, res) => {
    console.log(req.user);
    try {
        res.status(200).json({user: req.user});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1] || req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        redis.set(token, "logout", "EX", 60 * 60 * 24);
        res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
