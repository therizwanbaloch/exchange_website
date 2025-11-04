import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser, editProfile, getOtherUsers } from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js"

const userRouter = express.Router();

userRouter.get("/profile", isAuth, getCurrentUser);
userRouter.put("/profile", isAuth, editProfile);

export default userRouter;