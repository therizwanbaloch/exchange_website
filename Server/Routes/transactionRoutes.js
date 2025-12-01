import express from "express";
import isAuth from "../Middlewares/isAuth.js";
import { deposit, getDepositById, recentTransactions, withdraw } from "../Controllers/transController.js";
import { isAdmin } from "../Middlewares/isAdmin.js";

const tansRouter = express.Router();

tansRouter.post("/deposits", isAuth, deposit);
tansRouter.post("/withdraws", isAuth, withdraw);
tansRouter.get("/recent-transactions", isAuth, recentTransactions);
tansRouter.get("/details/:id", isAdmin, getDepositById);


export default tansRouter;