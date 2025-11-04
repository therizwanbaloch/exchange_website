import express from "express";
import { isAuth} from "../Middlewares/isAuth.js";
import { getRates } from "../Controllers/rateControllers.js";


const rateRouter = express.Router();

// Get all rates
rateRouter.get("/get-rates",isAuth, getRates);

// Get rate for a specific currency pair
// rateRouter.get("/:from/:to", getRateByPair);

// Admin: create new rate
// rateRouter.post("/add-rate", isAdmin, createRate);

// Admin: update rate
// rateRouter.put("/:id", isAuth, isAdmin, updateRate);

export default rateRouter;
