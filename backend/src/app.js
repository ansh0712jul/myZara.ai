import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { errorMiddleware } from "./middlewares/error.middleware.js"




const app=express();

app.use(morgan('dev'));

app.use(cors({
    origin:process.env.CORS_ORIGIN, // only allow http://localhost:5173
    credentials:true
}))

app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static("public"))
app.use(cookieParser())





// import  routes  
import userRouter from "../src/routes/user.routes.js"
import projectRoutes from "../src/routes/project.routes.js"
import aiRoutes from "../src/routes/ai.routes.js"
import quizRoutes from "../src/routes/quiz.routes.js"


// routes declaration hlooo every one
app.use("/user",userRouter);
app.use("/projects",projectRoutes);
app.use("/ai",aiRoutes);
app.use("/quiz",quizRoutes);






// global error handler middleware
app.use(errorMiddleware)




export {app}