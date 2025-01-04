import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import http from 'http';
import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import Project from "./models/Project.model.js";

dotenv.config({
    path: './.env'
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173/'
    }
});

io.use(async (socket, next) => {
    try {
        // Extract token and projectId from the handshake
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization.split(' ')[1];
        const projectId = socket.handshake.query.projectId;

        // Validate projectId
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error('Invalid project id'));
        }

        // Find the project associated with the projectId
        const project = await Project.findById(projectId).toString();
        if (!project) {
            return next(new Error('Project not found'));
        }

        // Validate token
        if (!token) {
            return next(new Error('Authentication error: No token provided'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return next(new Error('Authentication error: Invalid token'));
        }

        // Attach project and user to the socket object
        socket.project = project;
        socket.user = decoded;

        next();
    } catch (error) {
        console.error('Socket middleware error:', error);
        next(error); // Pass the error to the next middleware
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    console.log(socket.project._id)

    // Join the socket to the project room
    socket.join(socket.project._id);
    console.log(`User ${socket.id} joined room ${socket.project._id}`);
    socket.on('project-message', data =>{
        socket.broadcast.to(socket.project._id).emit('project-message', data);
        console.log(data);
    })

    
});

connectDB()
    .then(() => {
        server.listen(process.env.PORT || 8080, () => {
            console.log(`Server is listening at port: ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log('MongoDB connection failed:', err));
