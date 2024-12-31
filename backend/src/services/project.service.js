import Project from "../models/Project.model.js";
import ApiError from "../utils/ApiError.js";

export const createProject = async ({ 
    projectName, 
    description, 
    userId
}) =>{
    try {
        if(
            [ projectName, userId].some((item) => !item || item.trim ==="")
        ){
            throw new ApiError(400, "All fields are required")
        }

        // check userId should be of type ObjectId
        // if(!mongoose.Types.ObjectId.isValid(userId)){
        //     throw new ApiError(400, "Invalid user id");
        // }

        // checking project name should not exist in db 
        const existingProject = await Project.findOne({ projectName });
        if(existingProject){
            throw new ApiError(400, "Project name already exists");
        }

        // creating project in db 
        const project = await Project.create({
            projectName,
            description,
            usersInvolved: [userId]
        })
        return project;

    } catch (error) {
        console.log(" error occur while creating project",error);
        throw new ApiError(500, "An error occurred while creating project", "", { err: error.message });
    }
}