import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName: {
        type:String,
        required:[true,"Project name is required"],
        trim:true,
        unique:[true,"Project name must be unique"],
    },
    description : {
        type:String,
        lowercase:true,
        trim:true
    },
    usersInvolved:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"  
    }
})


const Project = mongoose.model("Project",projectSchema);
export default Project