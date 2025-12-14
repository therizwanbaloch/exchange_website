import express from "express";
import { getUserData, updateUserData } from "../Controllers/userDataController.js";
import isAuth from "../Middlewares/isAuth.js"

const userdataRouter = express.Router();

userdataRouter.get("/balance", isAuth, getUserData)
userdataRouter.put("/update", isAuth, updateUserData)


export default userdataRouter;