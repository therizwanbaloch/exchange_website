import express from "express";
// import { isAuth, isAdmin } from "../middlewares/authMiddleware.js";
import { adminLogin } from "../Controllers/admin/adminLogin.js";
import { approveTransaction, getAllDeposits, getAllTickets, getAllUsers, getAllWithdrawals, getPendingTickets, rejectTransaction } from "../Controllers/adminControllers.js";
import { isAdmin } from "../Middlewares/isAdmin.js";
import { getRates } from "../Controllers/rateControllers.js";
import { getAllTransactions } from "../Controllers/transController.js";

const adminRouter = express.Router();

// admin login 

adminRouter.post("/login", adminLogin)
// // Users

adminRouter.get("/users",isAdmin, getAllUsers);

// // Transactions
adminRouter.get("/transactions", isAdmin, getAllTransactions);
adminRouter.put("/transactions/:id/approve", isAdmin, approveTransaction);
adminRouter.put("/transactions/:id/reject", isAdmin, rejectTransaction);
adminRouter.get("/deposits", isAdmin , getAllDeposits )
adminRouter.get("/withdraws", isAdmin , getAllWithdrawals )
// // Support tickets
adminRouter.get("/all-tickets",  isAdmin, getAllTickets);
adminRouter.get("/pending-tickets", isAdmin, getPendingTickets)

// // Rates
adminRouter.get("/rates", isAdmin, getRates);

export default adminRouter;
