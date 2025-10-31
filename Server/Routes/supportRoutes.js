import express from "express";
import { createTicket, getUserTickets, getTicketById, updateTicket } from "../controllers/supportController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const supportRouter = express.Router();

// Create a new ticket
supportRouter.post("/create", isAuth, createTicket);

// Get all tickets of logged-in user
supportRouter.get("/user", isAuth, getUserTickets);

// Get single ticket
supportRouter.get("/:id", isAuth, getTicketById);

// Update ticket status (resolved)
supportRouter.put("/:id", isAuth, updateTicket);

export default supportRouter;
