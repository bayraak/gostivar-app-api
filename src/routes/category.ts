import { Router } from "express";
import CategoryController from "../controllers/CategoryController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole"

const router = Router();

router.get("/", [], CategoryController.listAll);

router.get("/:id([0-9]+)", [], CategoryController.getOneById);

router.post("/", [checkJwt, checkRole(["ADMIN"])], CategoryController.newCategory);

router.put("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], CategoryController.editCategory);

router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], CategoryController.deleteCategory);

router.get("/by-user/:id([0-9]+)", CategoryController.getAvailableCategoriesForUser);

export default router;