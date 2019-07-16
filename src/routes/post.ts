import { Router } from "express";
import PostController from "../controllers/PostController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all posts
router.get("/", [], PostController.getAllPosts);
router.post("/", [checkJwt, checkRole(["USER"])], PostController.createPost);


export default router;