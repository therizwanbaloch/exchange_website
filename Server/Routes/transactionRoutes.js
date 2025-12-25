import express from "express";
import isAuth from "../Middlewares/isAuth.js";
import { createDeposit, getConversionAmount, getGatewayDetails, getGatewayNames, getTransactionById, performExchange, recentTransactions, withdraw } from "../Controllers/transController.js";
import { isAdmin } from "../Middlewares/isAdmin.js";

const tansRouter = express.Router();

tansRouter.post("/deposit", isAuth, createDeposit);
tansRouter.get("/gateways", isAuth, getGatewayNames);
tansRouter.get("/gateway/:id", isAuth, getGatewayDetails);
tansRouter.post("/withdraw", isAuth, withdraw);
tansRouter.get("/recent-transactions", isAuth, recentTransactions);
tansRouter.get("/details/:id", isAdmin, getTransactionById);
tansRouter.post("/calculate", isAuth, getConversionAmount);
tansRouter.post("/exchange", isAuth, performExchange);


export default tansRouter;