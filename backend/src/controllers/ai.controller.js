import * as ai from '../services/ai.service.js';
import asyncHandler from '../utils/asyncHandler.js';

export const generateContent = async (req, res) => {
    const { prompt } = req.query;
    const content = await ai.generateContent(prompt);
    res.status(200).json({ content });
}
