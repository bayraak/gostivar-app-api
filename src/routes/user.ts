import { Router } from "express";
  import UserController from "../controllers/UserController";
  import { checkJwt } from "../middlewares/checkJwt";
  import { checkRole } from "../middlewares/checkRole";

  const router = Router();

  //Get all users
  router.get("/", [], UserController.listAll);

  // Get one user
  router.get("/:id([0-9]+)", [checkJwt, checkRole(["USER", "ADMIN"])], UserController.getOneById);

  //Create a new user
  router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);

  //Edit one user
  router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.editUser
  );

  //Delete one user
  router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.deleteUser
  );

  router.get("/:id/categories/", [checkJwt], UserController.getAvailableCategoriesForPublish);

  router.post("/my-notifications", [checkJwt], UserController.updateEnabledNotifications);

  router.put("/:id/profile-preferences/", [checkJwt], UserController.updateProfilePreferences);


  export default router;