import { Router } from "express";
import ReportController from "../controllers/ReportController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all reports
router.get("/", [checkJwt, checkRole(["ADMIN"])], ReportController.getAll);

//Create new report
router.post("/", [checkJwt, checkRole(["ADMIN", "USER"])], ReportController.createReport);

//Get single report
router.get("/:id", [checkJwt, checkRole(["ADMIN"])], ReportController.getOneById);

export default router;