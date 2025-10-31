const express = require("express");
const supportRouter = express.Router();
const { createTicket, getUserTickets, getTicketById, updateTicket } = require("../controllers/supportController");
const { isAuth } = require("../middlewares/isAuth");

// Create a new ticket
supportRouter.post("/create", isAuth, createTicket);

// Get all tickets of logged-in user
supportRouter.get("/user", isAuth, getUserTickets);

// Get single ticket
supportRouter.get("/:id", isAuth, getTicketById);

// Update ticket status (resolved)
supportRouter.put("/:id", isAuth, updateTicket);



export default supportRouter;
