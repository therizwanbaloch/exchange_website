import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser, editProfile, getOtherUsers } from "../controllers/userController.js";

const tansRouter = express.Router();

tansRouter.post("/deposit", isAuth, getCurrentUser);
tansRouter.post("/withdraw", isAuth, getOtherUsers);
tansRouter.get("/user", isAuth, editProfile);
tansRouter.get("/:id", isAuth, )


export default tansRouter;