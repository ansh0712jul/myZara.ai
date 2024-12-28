// Desc: User service to handle user related operations
import User from "../models/User.model.js";

export const registers= async ({userName,email,password}) => {
    try {
        if(!userName || !email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({ userName, email, password });
        
       return user;
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}