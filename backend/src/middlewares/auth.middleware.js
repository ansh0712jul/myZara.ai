import jwt from 'jsonwebtoken';
import redis from '../services/redis.service.js';

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1] || req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const isTokenExist = await redis.get(token);
        if (isTokenExist) {
            res.cookies("token", "", { httpOnly: true, expires: new Date(0) }); 
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}