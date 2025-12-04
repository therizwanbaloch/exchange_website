import express from "express";
import { isAuth} from "../Middlewares/isAuth.js";
import { createRate, deleteRate, getRates, updateRate } from "../Controllers/rateControllers.js";
import { isAdmin } from "../Middlewares/isAdmin.js";


const rateRouter = express.Router();


rateRouter.get("/get-rates",isAuth, getRates);
rateRouter.post("/add-rate", isAdmin, createRate);
rateRouter.put("/edit-rate/:id", isAdmin, updateRate);
rateRouter.delete("/delete-rate/:id", isAdmin, deleteRate);


export default rateRouter;
