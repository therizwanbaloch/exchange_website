import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser, editProfile, getOtherUsers } from "../controllers/userController.js";

const walletRouter = express.Router();

walletRouter.post("/send", isAuth, getCurrentUser);
walletRouter.post("/request", isAuth, getOtherUsers);
walletRouter.post("/exchange", isAuth, editProfile);
walletRouter.get("/history", isAuth, )


export default walletRouter;