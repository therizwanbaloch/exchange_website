import express from "express";
import { createTicket, getUserTickets, getTicketById, updateTicket } from "../controllers/supportController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const supportRouter = express.Router();


supportRouter.post("/create", isAuth, createTicket);
supportRouter.get("/user", isAuth, getUserTickets);


export default supportRouter;
