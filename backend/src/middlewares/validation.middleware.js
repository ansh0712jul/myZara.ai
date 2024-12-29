import ApiError from "../utils/ApiError.js";


export const validateRequest = (schema) => (req, res, next) => {
    try {
      // Validate the request body using Zod schema
      schema.parse(req.body); 
      next(); 
    } catch (err) {
      
      const errors = err.errors.map((e) => e.message);
  
      
      next(new ApiError(400, "Validation Error", errors)); // Pass detailed errors to ApiError
    }
  };