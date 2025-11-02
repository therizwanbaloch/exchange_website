import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getBalances } from "../Controllers/walletController.js";

const walletRouter = express.Router();

walletRouter.get("/balances", isAuth, getBalances);


export default walletRouter;