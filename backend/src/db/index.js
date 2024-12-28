import mongoose from  "mongoose"



const connectDB= async()=>{
    try {
        const dbInstance=await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`\n mongodb connection established !! db host: ${
            dbInstance.connection.host
        }`)
        
    } catch (error) {
        console.log('mongodb connection error',error)
        process.exit(1);
    }
}

export default connectDB