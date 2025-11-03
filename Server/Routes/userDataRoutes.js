import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getUserData } from "../Controllers/userDataConroller.js";

const userDataRouter = express.Router();

walletRouter.get("/user-data", isAuth, getUserData);


export default userDataRouter;