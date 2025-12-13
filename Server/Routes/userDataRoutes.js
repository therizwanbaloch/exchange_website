import express from "express";
import { getUserData } from "../Controllers/userDataController.js";
import isAuth from "../Middlewares/isAuth.js"

const userdataRouter = express.Router();

userdataRouter.get("/balance", isAuth, getUserData)


export default userdataRouter;