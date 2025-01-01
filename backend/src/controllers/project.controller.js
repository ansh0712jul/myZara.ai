import mongoose from "mongoose";
import Project from "../models/Project.model.js";
import { createProject, getAllProjects, addUserToProject, getProjectById, getProjectByUserId } from "../services/project.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.model.js";

export const create = asyncHandler(async (req, res) => {

    const { projectName, description } = req.body;
    const loggedInUser = await User.findOne({ email: req.user.email });
    const userId = loggedInUser._id;

    const newProject = await createProject({ projectName, description, userId });
    if (!newProject) {
        throw new ApiError(500, "Something went wrong while creating project");
    }

    res.status(201).json(new ApiResponse(201, "Project created successfully", newProject));
});

export const getAllProject = asyncHandler(async (req, res) => {
    try {
        const loggedInUser = await User.findOne({ email: req.user.email });
        const userId = loggedInUser._id;
        const projects = await getAllProjects({ userId });
         res.status(200).json(new ApiResponse(200, "All projects fetched successfully", projects));


    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching projects");
    }

});

export const addUserToProjects = asyncHandler(async (req, res) => {
    try {
        const { projectId, Users } = req.body;
        console.log("projectId", projectId);
        console.log("Users", Users);
        const loggedInUser = await User.findOne({ email: req.user.email });
        const userId = loggedInUser._id;
        console.log("userId", userId);
        const project = await addUserToProject({ projectId, Users, UserId: userId  });
        if (!project) {
            throw new ApiError(500, "Something went wrong while adding user to project");
        }
        res.status(200).json(new ApiResponse(200, "User added to project successfully", project));
        
    } catch (error) {
        throw new ApiError(500, "Something went wrong while adding user to project");    
    }

});

export const getProjectByIds = asyncHandler(async (req, res) => {
    try {
        const projectId = req.params.projectId;
        console.log("projectId", projectId);
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            throw new ApiError(400, "Invalid project id");
        }
        const project = await getProjectById({projectId});
        if (!project) {
            throw new ApiError(404, "Project not found");
        }
        res.status(200).json(new ApiResponse(200, "Project fetched successfully", project));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching project");
    }
});

export const projectByUser =  asyncHandler( async (req,res) =>{
    const { userId } = req.params;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400, "Invalid user id");
    }
     
    const projects =await getProjectByUserId({userId});
    res.status(200).json(new ApiResponse(200, "Project fetched successfully", projects));

})