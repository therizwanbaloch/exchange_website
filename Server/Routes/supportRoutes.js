import express from "express";
import { createTicket, getUserTickets } from "../Controllers/supportController.js";
import isAuth from "../Middlewares/isAuth.js";

const supportRouter = express.Router();


supportRouter.post("/create-ticket", isAuth, createTicket);
supportRouter.get("/my-tickets", isAuth, getUserTickets);


export default supportRouter;
