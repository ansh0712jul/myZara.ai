import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `Write clean, efficient, and well-documented code in the
    MERN (MongoDB, Express, React, Node.js) stack. Ensure that the 
    code follows best practices, is modular, and scalable. Include proper error
    handling, input validation, and comments to explain complex logic. The backend 
    should use Mongoose for MongoDB schema definitions, JWT for authentication, and
    Express.js for routing. The frontend should be built with React and styled using 
    modern CSS frameworks like Tailwind or Material-UI. Provide complete implementation
    with examples of CRUD operations, RESTful APIs, and integration between frontend
    and backend. Optimize for security and performance. Respond with the code and a
    brief explanation of your approach`
});

export const generateContent = async (prompt) => {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
}