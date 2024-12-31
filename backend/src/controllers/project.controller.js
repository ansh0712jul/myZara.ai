import mongoose from "mongoose";
import Project from "../models/Project.model.js";
import { createProject } from "../services/project.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.model.js";

export const create = asyncHandler(async (req, res) =>{

    const { projectName, description } = req.body;
    const loggedInUser = await User.findOne( { email:req.user.email} );
    const userId = loggedInUser._id;

    const newProject = await createProject({ projectName, description, userId });
    if(!newProject){
        throw new ApiError(500, "Something went wrong while creating project");
    }

    res.status(201).json(new ApiResponse(201, "Project created successfully", newProject));
})