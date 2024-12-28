import mongoose from  "mongoose"
import { DB_NAME } from "../constants.js"


const connectDB= async()=>{
    try {
        const dbInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log(`\n mongodb connection established !! db host: ${
            dbInstance.connection.host
        }`)
        
    } catch (error) {
        console.log('mongodb connection error',error)
        process.exit(1);
    }
}

export default connectDB