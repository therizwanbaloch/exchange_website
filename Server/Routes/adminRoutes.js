import express from "express";
// import { isAuth, isAdmin } from "../middlewares/authMiddleware.js";
import { adminLogin } from "../Controllers/admin/adminLogin.js";

const adminRouter = express.Router();

// admin login 

adminRouter.post("/login", adminLogin)
// // Users
// adminRouter.get("/users", isAuth, isAdmin, getAllUsers);

// // Transactions
// adminRouter.get("/transactions", isAuth, isAdmin, getAllTransactions);
// adminRouter.put("/transactions/:id/approve", isAuth, isAdmin, approveTransaction);
// adminRouter.put("/transactions/:id/reject", isAuth, isAdmin, rejectTransaction);

// // Support tickets
// adminRouter.get("/support", isAuth, isAdmin, getAllSupportTickets);
// adminRouter.put("/support/:id", isAuth, isAdmin, updateSupportTicket);

// // Rates (optional)
// adminRouter.get("/rates", isAuth, isAdmin);

export default adminRouter;
