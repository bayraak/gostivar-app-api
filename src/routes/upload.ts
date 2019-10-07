import { Router } from "express";
import UploadController from "../controllers/UploadController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import multer from 'multer';

const postPhotoUpload = multer()

const router = Router();

//Upload photo
router.post("/image", postPhotoUpload.array('photos', 10), [checkJwt, checkRole(["USER", "ADMIN"])], UploadController.uploadPostPhoto);

export default router;