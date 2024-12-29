import User from "../models/User.model.js";
import { registers } from "../services/user.service.js";
import { validationResult } from "express-validator";
import redis from "../services/redis.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Register User
export const register = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Validation failed", "", errors.array());
    }

    const { userName, email, password } = req.body;
    if (
        [ email, userName, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }


    const existingUser = await User.findOne({ 
        $or: [{ userName } , { email }]
    })

    if (existingUser) {
        throw new ApiError(409, "User with emial or username already exists");
    }
    const user = await registers({ userName, email, password });
    const token = user.generateToken();
    if (!user){
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    res.status(201).json(new ApiResponse(201, "User registered successfully", { user, token }));
});

// Login User
export const login = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Validation failed", "", errors.array());
    }

    const { userName, password } = req.body;
    if(!userName || !password){
        throw new ApiError(400, "All fields are required")
    }
    const user = await User.findOne({ userName }).select("+password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) {
        throw new ApiError(404, "Invalid user  credentials");
    }

    const token = user.generateToken();
    res.status(200).json(new ApiResponse(200, "User LoggedIn successful", { user, token }));
});

// Profile User
export const profile = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized");
    }

    res.status(200).json(new ApiResponse(200, "User profile fetched successfully", { user: req.user }));
});

// Logout User
export const logout = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(" ")[1] || req.cookies.token;
    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }

    await redis.set(token, "logout", "EX", 60 * 60 * 24); // Set token to expire in 24 hours
    res.status(200).json(new ApiResponse(200, "Logout successful"));
});
