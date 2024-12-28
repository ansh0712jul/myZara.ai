import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile",authMiddleware.auth, userController.profile);
router.get("/logout",authMiddleware.auth, userController.logout);
export default router;