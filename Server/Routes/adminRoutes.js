import express from "express";
import { adminLogin } from "../Controllers/admin/adminLogin.js";
import { approveTransaction, createDepositMethod, deleteDepositMethod, getAllDeposits, getAllTickets, getAllUsers, getAllWithdrawals, getDashboardStats, getDepositMethods, getPendingDeposits, getPendingTickets, getPendingWithdraws, getRecentUsers, getTicketDetailsAdmin, rejectTransaction, updateDepositMethod } from "../Controllers/adminControllers.js";
import { isAdmin } from "../Middlewares/isAdmin.js";
import { getRates } from "../Controllers/rateControllers.js";
import { getAllTransactions } from "../Controllers/transController.js";
import { updateTicketStatus } from "../Controllers/supportController.js";
import isAuth from "../Middlewares/isAuth.js";

const adminRouter = express.Router();


adminRouter.post("/login", adminLogin)

adminRouter.get("/users",isAdmin, getAllUsers);
adminRouter.get("/recent-users",isAdmin, getRecentUsers);


adminRouter.get("/transactions", isAdmin, getAllTransactions);
adminRouter.put("/transactions/:id/approve", isAdmin, approveTransaction);
adminRouter.put("/transactions/:id/reject", isAdmin, rejectTransaction);
adminRouter.get("/deposits", isAdmin , getAllDeposits )
adminRouter.get("/p-deposits", isAdmin , getPendingDeposits )
adminRouter.get("/withdraws", isAdmin , getAllWithdrawals )
adminRouter.get("/p-withdraws", isAdmin , getPendingWithdraws );
adminRouter.post("/deposit-method", isAdmin , createDepositMethod);
adminRouter.get("/deposit-methods", isAdmin , getDepositMethods);
adminRouter.put("/deposit-method/update/:id", isAdmin, updateDepositMethod);
adminRouter.delete("/deposit-method/delete/:id", isAdmin, deleteDepositMethod)



adminRouter.get("/all-tickets",  isAdmin, getAllTickets);
adminRouter.get("/pending-tickets", isAdmin, getPendingTickets)
adminRouter.get("/ticket/:id", isAdmin, getTicketDetailsAdmin);
adminRouter.put("/ticket/:id/status", isAdmin, updateTicketStatus)
adminRouter.get("/stats", isAdmin, getDashboardStats)




adminRouter.get("/rates", isAdmin, getRates);

export default adminRouter;
