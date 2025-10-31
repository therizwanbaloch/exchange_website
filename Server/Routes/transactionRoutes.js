import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { deposit, withdraw } from "../Controllers/transController.js";

const tansRouter = express.Router();

tansRouter.post("/deposit", isAuth, deposit);
tansRouter.post("/withdraw", isAuth, withdraw);


export default tansRouter;