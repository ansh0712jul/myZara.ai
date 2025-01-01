import Project from "../models/Project.model.js";
import ApiError from "../utils/ApiError.js";
import mongoose from 'mongoose';
import User from "../models/User.model.js";

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

        if(!mongoose.Types.ObjectId.isValid(userId)){
            throw new ApiError(400, "Invalid user id");
        }

        // checking project name should not exist in db 
        const existingProject = await Project.findOne({ projectName });
        if(existingProject){
            throw new ApiError(400, "Project name already exists");
        }

        // creating project in db 
        const project = await Project.create({
            projectName,
            description,
            usersInvolved: [userId],
            owner: userId
        })
        return project;

    } catch (error) {
        console.log(" error occur while creating project",error);
        throw new ApiError(500, "An error occurred while creating project", "", { err: error.message });
    }
}

export const getAllProjects = async ({userId}) => {
    try {
        if(!userId){
            throw new ApiError(400, "User id is required");
        }
        // check userId should be of type ObjectId  
        // if(!mongoose.Types.ObjectId.isValid(userId)){    
        //     throw new ApiError(400, "Invalid user id");
        // }    
        const projects = await Project.find({ usersInvolved: userId });
        return projects;
    } catch (error) {
        console.log(" error occur while fetching projects",error);
        throw new ApiError(500, "An error occurred while fetching projects", "", { err: error.message });
    }
}

export const addUserToProject = async ({ projectId, Users, UserId }) => {
    try {
        console.log("projectId", projectId);
        console.log("User", Users);
        console.log("UserId", UserId);
        if(!Users || !Array.isArray(Users) || Users.length === 0){
            throw new ApiError(400, "Users should be an array of user ids");
        }
        if(!projectId){
            throw new ApiError(400, "projectId should be a string");
        }
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            throw new ApiError(400, "Invalid project id");
        }
        if(!UserId){
            throw new ApiError(400, "User id is required");
        }
        if(!mongoose.Types.ObjectId.isValid(UserId)){
            throw new ApiError(400, "Invalid user id");
        }
        if (
            [projectId, User].some((item) => !item || item.trim === "")
        ) {
            throw new ApiError(400, "All fields are required");
        }


        // check if project exists
        const project = await Project.findOne({ _id: projectId, usersInvolved: UserId });

        if (!project) {
            throw new ApiError(404, "Project not found");
        }

        // check if user exists
        const users = await User.find({ _id: { $in: Users } });
        if (users.length !== Users.length) {
            throw new ApiError(404, "One or more users not found");
        }


        // add users to project
        project.usersInvolved = project.usersInvolved.concat(Users);
        await project.save();
        return project;

    } catch (error) {
        console.log(" error occur while adding user to project", error);
        throw new ApiError(500, "An error occurred while adding user to project", "", { err: error.message });
    }
}   

export const getProjectById = async ({ projectId }) => {
    try {
        console.log("projectId", projectId);
        if (!projectId) {
            throw new ApiError(400, "projectId is required");
        }
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            throw new ApiError(400, "Invalid project id");
        }
        const project = await Project.findById(projectId).populate("usersInvolved");
        return project;
    } catch (error) {
        console.log(" error occur while fetching project", error);
        throw new ApiError(500, "An error occurred while fetching project", "", { err: error.message });
    }
}