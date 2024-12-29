import { z } from "zod";


export const signInSchema = z.object({
    userName : z.string(),
    password : z.string()
});