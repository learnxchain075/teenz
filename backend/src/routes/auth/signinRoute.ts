import express from "express";
import { signinController, signupController } from "../../controller/auth/signinController";
import multer from "multer";



const router = express.Router();
const upload = multer();

router.post("/signin", signinController);

router.post("/signup",upload.single("profilePicture"), signupController);

router.post("/superadmin/admin/signup", upload.single("profilePicture"), signupController);

export default router;
