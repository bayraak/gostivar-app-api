import { Router, Request, Response } from "express";
import user from "./user";
import auth from "./auth";
import category from './category';
import post from "./post";
import report from "./report";

const routes = Router();

routes.use("/user", user);
routes.use("/auth", auth);
routes.use("/category", category)
routes.use("/post", post);
routes.use("/report", report);

export default routes;