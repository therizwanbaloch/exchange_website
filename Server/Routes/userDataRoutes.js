import express from "express";
import { getUserData } from "../Controllers/userDataController.js";
import isAuth from "../middlewares/isAuth.js";

const userdataRouter = express.Router();

userdataRouter.get("/user-data", isAuth, getUserData)


export default userdataRouter;