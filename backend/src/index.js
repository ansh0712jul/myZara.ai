import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from "./db/index.js";
import http from 'http';
import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import project from "../src/models/Project.model.js";
import mongoose from "mongoose";

dotenv.config({
    path:'./env'
})
const server = http.createServer(app);
const io = new Server(server,{
    cors:{  
        origin:'*'
    }
});

io.use(async(socket, next)=>{
    try {

        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];

        const projectId = socket.handshake.query.projectId;
        console.log("indexedDB.js "+projectId);
        if(!projectId || mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error('Project id is required'));
        } 
        
        socket.project = await project.findById(projectId);
        console.log("socket.project "+socket);
        
        if(!token){
            return next(new Error('Authentication error'));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return next(new Error('Authentication error'));
        }
        socket.user = decoded.user;
        next();
    } catch (error) {
        next(new Error('Authentication error'));
    }
})

io.on('connection', socket => {
    console.log('a user connected');
    socket.join(socket.project._id);


    socket.on('project-message', data=> {
        socket.broadcast.to(socket.project._id).emit('project-message',data);
    })

  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { /* … */ });
});

connectDB()
.then(()=>{
    server.listen(process.env.PORT || 8080,()=>{
        console.log(`server is listening at port : ${process.env.PORT}`)

    })
})
.catch((err)=> console.log('MongoDb connection failed!!',err))