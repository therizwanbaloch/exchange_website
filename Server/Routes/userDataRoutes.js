import express from "express";
import isAuth from "../Middlewares/isAuth"
import { getUserData } from "../Controllers/userDataConroller.js";

const userDataRouter = express.Router();

userDataRouter.get("/user-data", isAuth, getUserData)

export default userDataRouter;