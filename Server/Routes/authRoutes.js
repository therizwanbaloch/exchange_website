import express from "express";
import { login, Register } from "../Controllers/authControllers.js";

const authRouter = express.Router();

// Signup route
authRouter.post("/register", Register);

// Login route
authRouter.post("/login", login);


export default authRouter;