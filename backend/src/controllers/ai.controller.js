import * as ai from '../services/ai.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from  '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const generateContent = asyncHandler(async (req, res) => {

    const { prompt } = req.query;
    const result = await ai.generateContent(prompt);
    if(!result){
        throw new ApiError(500, "Something went wrong while generating content");
    }
    res.status(200).json(new ApiResponse(200, "Content generated successfully", result));

});
