import express from "express";
// import { isAuth, isAdmin } from "../middlewares/authMiddleware.js";
import { adminLogin } from "../Controllers/admin/adminLogin.js";
import { approveTransaction, getAllDeposits, getAllTickets, getAllUsers, getAllWithdrawals, getPendingTickets, getTicketDetailsAdmin, rejectTransaction } from "../Controllers/adminControllers.js";
import { isAdmin } from "../Middlewares/isAdmin.js";
import { getRates } from "../Controllers/rateControllers.js";
import { getAllTransactions } from "../Controllers/transController.js";
import { updateTicketStatus } from "../Controllers/supportController.js";
import isAuth from "../Middlewares/isAuth.js";

const adminRouter = express.Router();


adminRouter.post("/login", adminLogin)

adminRouter.get("/users",isAdmin, getAllUsers);


adminRouter.get("/transactions", isAdmin, getAllTransactions);
adminRouter.put("/transactions/:id/approve", isAdmin, approveTransaction);
adminRouter.put("/transactions/:id/reject", isAdmin, rejectTransaction);
adminRouter.get("/deposits", isAdmin , getAllDeposits )
adminRouter.get("/withdraws", isAdmin , getAllWithdrawals )



adminRouter.get("/all-tickets",  isAdmin, getAllTickets);
adminRouter.get("/pending-tickets", isAdmin, getPendingTickets)
adminRouter.get("/ticket/:id", isAdmin, getTicketDetailsAdmin);
adminRouter.put("/ticket/:id/status", isAdmin, updateTicketStatus)




adminRouter.get("/rates", isAdmin, getRates);

export default adminRouter;
