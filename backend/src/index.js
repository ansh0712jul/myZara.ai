import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from "./db/index.js";



dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8080,()=>{
        console.log(`server is listening at port : ${process.env.PORT}`)

    })
})
.catch((err)=> console.log('MongoDb connection failed!!',err))