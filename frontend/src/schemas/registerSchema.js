import { z } from "zod";

export const signUpSchema = z.object({
    userName : z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must only contain letters, numbers, and underscores"),
    email: z
    .string()
    .email({message:"Invalid email format"})
    .nonempty("email is required"),
    password: z.
    string()
    .min(4, {message:"Password must be at least 4 characters long"})
    .max(12, {message:"Password must be at most 12 characters long"})
    .nonempty("Password is required")
});