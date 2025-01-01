import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from "./db/index.js";
import http from 'http';
import {Server} from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Project from "./models/Project.model.js";
dotenv.config({
    path:'./env'
})


const server = http.createServer(app);
const io = new Server(server);

io.use(async(socket, next) => {
    try {

        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(" ")[1];
        const projectId = socket.handshake.query.projectId;
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error('invalid project id'));
        }
        socket.project = await Project.findById(projectId);

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return next(new Error('invalid token'));
        }
        socket.user = decoded;
        return next();
    }
    return next(new Error('invalid token'));
        
    } catch (error) {
        console.log("error while connecting socket",error);
    }
    
  });

io.on('connection', socket => {
    console.log('a user connected');
    socket.join(socket.project._id);
    socket.on('project-message', data => {
        socket.broadcast.to (socket.project._id).emit('project-message', data);
    });
  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { /* … */ });
});

connectDB()
.then(()=>{
    server.listen(process.env.PORT || 8078,()=>{
        console.log(`server is listening at port : ${process.env.PORT}`)

    }) 
})
.catch((err)=> console.log('MongoDb connection failed!!',err))