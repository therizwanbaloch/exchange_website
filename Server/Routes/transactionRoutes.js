import express from "express";
import isAuth from "../Middlewares/isAuth.js";
import { createDeposit, getDepositById, getGatewayDetails, getGatewayNames, recentTransactions, withdraw } from "../Controllers/transController.js";
import { isAdmin } from "../Middlewares/isAdmin.js";

const tansRouter = express.Router();

tansRouter.post("/deposit", isAuth, createDeposit);
tansRouter.get("/gateways", isAuth, getGatewayNames);
tansRouter.get("/gateways/:id", isAuth, getGatewayDetails);
tansRouter.post("/withdraws", isAuth, withdraw);
tansRouter.get("/recent-transactions", isAuth, recentTransactions);
tansRouter.get("/details/:id", isAdmin, getDepositById);


export default tansRouter;