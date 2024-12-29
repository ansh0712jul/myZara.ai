//  User service to handle user related operations
import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
export const registers= async ({userName,email,password}) => {
    try {
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
        const user = await User.create({ userName, email, password });
        
       return user;
    } catch (error) {
        throw new ApiError(500, "An error occurred", "", { err: error.message });
    }
}