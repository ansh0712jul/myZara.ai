import { Router } from "express";
const router = Router();
import * as aiController from "../controllers/ai.controller.js";


router.get("/result", aiController.generateContent);

export default router;