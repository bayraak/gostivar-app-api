import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Login
router.post("/login", [], AuthController.login);
router.post("/register", [], AuthController.register);

export default router;