import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.post("/login", [], AuthController.login);
router.post("/register", [], AuthController.register);
router.post("/forgotpassword", [], AuthController.forgotPassword);
router.get("/resetpassword", [], AuthController.resetPassword);

export default router;