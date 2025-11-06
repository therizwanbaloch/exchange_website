import express from "express";
// import { isAuth, isAdmin } from "../middlewares/authMiddleware.js";
import { adminLogin } from "../Controllers/admin/adminLogin.js";
import { getAllTickets, getAllUsers, getPendingTickets } from "../Controllers/adminControllers.js";
import { isAdmin } from "../Middlewares/isAdmin.js";

const adminRouter = express.Router();

// admin login 

adminRouter.post("/login", adminLogin)
// // Users

adminRouter.get("/users",isAdmin, getAllUsers);

// // Transactions
// adminRouter.get("/transactions", isAuth, isAdmin, getAllTransactions);
// adminRouter.put("/transactions/:id/approve", isAuth, isAdmin, approveTransaction);
// adminRouter.put("/transactions/:id/reject", isAuth, isAdmin, rejectTransaction);

// // Support tickets
adminRouter.get("/all-tickets",  isAdmin, getAllTickets);
adminRouter.get("/pending-tickets", isAdmin, getPendingTickets)

// // Rates (optional)
// adminRouter.get("/rates", isAuth, isAdmin);

export default adminRouter;
