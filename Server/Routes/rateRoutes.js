import express from "express";
import { isAuth} from "../Middlewares/isAuth.js";
import { createRate, getRates } from "../Controllers/rateControllers.js";
import { isAdmin } from "../Middlewares/isAdmin.js";


const rateRouter = express.Router();


rateRouter.get("/get-rates",isAuth, getRates);

rateRouter.post("/add-rate", isAdmin, createRate);



export default rateRouter;
