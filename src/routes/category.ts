import { Router } from "express";
import CategoryController from "../controllers/CategoryController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole"

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN"])], CategoryController.listAll);

router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], CategoryController.getOneById);

router.post("/", [checkJwt, checkRole(["ADMIN"])], CategoryController.newCategory);

router.put("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], CategoryController.editCategory);

router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], CategoryController.deleteCategory);

export default router;