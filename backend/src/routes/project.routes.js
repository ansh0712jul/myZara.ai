import { Router } from "express";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create",authMiddleware.auth,projectController.create);

export default router;