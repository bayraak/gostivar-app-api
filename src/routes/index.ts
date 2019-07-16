import { Router, Request, Response } from "express";
import user from "./user";
import auth from "./auth";
import category from './category';

const routes = Router();

routes.use("/user", user);
routes.use("/auth", auth);
routes.use("/category", category)

export default routes;