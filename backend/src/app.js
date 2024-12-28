import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import userRouter from "../src/routes/user.routes.js"



const app=express()

app.use(morgan('dev'))

app.use(cors({
    origin:process.env.CORS_ORIGIN, // only allow http://localhost:5173
    credentials:true
}))

app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static("public"))
app.use(cookieParser())

app.use("/user",userRouter);



// import  routes here 
// import userRouter from "./routes/userRoutes.js"  -- like 


// routes declaration
// app.use("/api/v1/users",userRouter) --like

app.get("/",(req,res)=>{
    res.send("Hello World")
})




export {app}