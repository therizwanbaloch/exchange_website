import express from "express";
import isAuth from "../Middlewares/isAuth.js";
import { deposit, recentTransactions, withdraw } from "../Controllers/transController.js";

const tansRouter = express.Router();

tansRouter.post("/deposits", isAuth, deposit);
tansRouter.post("/withdraws", isAuth, withdraw);
tansRouter.get("/recent-transactions", isAuth, recentTransactions);


export default tansRouter;