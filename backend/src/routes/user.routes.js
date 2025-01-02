import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

import { signUpSchema } from "../schemas/signUpSchema.js";
import { signInSchema } from "../schemas/signInSchema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/register",validateRequest(signUpSchema) , userController.register);
router.post("/verify-email", userController.verifyEmail);
router.post("/login", validateRequest(signInSchema), userController.login);
router.get("/profile",authMiddleware.auth, userController.profile);
router.get("/logout",authMiddleware.auth, userController.logout);
router.get("/all",authMiddleware.auth, userController.getAllUsers);
export default router;