// src/middlewares/error.middleware.js
export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    const extradetails = err.extradetails || "error from backend";
    const errors = err.errors || []; // Include the validation errors
  
    return res.status(statusCode).json({
      success: false,
      message,
      extradetails,
      errors, // Include the validation errors in the response
    });
  };
  