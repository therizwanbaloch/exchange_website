import express from "express";
import { getRates, getRateByPair, createRate, updateRate } from "../controllers/rateController.js";
import { isAuth, isAdmin } from "../middlewares/authMiddleware.js";

const rateRouter = express.Router();

// Get all rates
rateRouter.get("/", getRates);

// Get rate for a specific currency pair
rateRouter.get("/:from/:to", getRateByPair);

// Admin: create new rate
rateRouter.post("/", isAuth, isAdmin, createRate);

// Admin: update rate
rateRouter.put("/:id", isAuth, isAdmin, updateRate);

export default rateRouter;
