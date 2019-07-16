import { Router, Request, Response } from "express";
import user from "./user";
import auth from "./auth";
import post from "./post";

const routes = Router();

routes.use("/user", user);
routes.use("/auth", auth);
routes.use("/post", post);

export default routes;