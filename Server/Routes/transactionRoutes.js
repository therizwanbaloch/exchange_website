import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { deposit } from "../Controllers/transController.js";

const tansRouter = express.Router();

tansRouter.post("/deposit", isAuth, deposit);
// tansRouter.post("/withdraw", isAuth, getOtherUsers);


export default tansRouter;