import { Router } from "express";
import PostController from "../controllers/PostController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all posts
router.get("/", [checkJwt, checkRole(["USER", "ADMIN"])], PostController.getPosts);

//Create new post
router.post("/", [checkJwt, checkRole(["USER", "ADMIN"])], PostController.createPost);

//Get post by id
router.get("/:id", [checkJwt, checkRole(["USER", "ADMIN"])], PostController.getPostById);

//Get post likes
router.get("/:id/likes", [checkJwt, checkRole(["USER", "ADMIN"])], PostController.getPostLikes);

//Toggle post like
router.get("/:id/toggleLike", [checkJwt, checkRole(["USER", "ADMIN"])], PostController.toggleLike);


export default router;