import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser, editProfile, getOtherUsers } from "../controllers/userController.js";

const reqRouter = express.Router();

reqRouter.post("/create", isAuth, getOtherUsers);
reqRouter.get("/user", isAuth, editProfile);
reqRouter.put("/:id/accept", isAuth, )
reqRouter.put("/:id/decline", isAuth, getCurrentUser);


export default walletRouter;