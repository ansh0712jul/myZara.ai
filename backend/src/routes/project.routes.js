import { Router } from "express";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import { body } from "express-validator";


const router = Router();

router.post("/create",authMiddleware.auth,projectController.create);
router.get("/all",authMiddleware.auth,projectController.getAllProject);
router.put("/add-user",authMiddleware.auth,
    body("projectId").isString().withMessage("projectId should be a string"),
    body("User").isArray({min: 1}).withMessage("users should be an array of user ids").custom((User)=>User.every(user => typeof user === "string")),
    projectController.addUserToProjects);

router.get("/get-project/:projectId",authMiddleware.auth,projectController.getProjectByIds);



export default router;