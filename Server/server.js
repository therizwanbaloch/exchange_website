import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";


import authRouter from "./Routes/authRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// import supportRouter from "./routes/supportRoutes.js";
// import rateRouter from "./routes/rateRoutes.js";
// import adminRouter from "./routes/adminRoutes.js";
// import walletRouter from "./routes/walletRoutes.js";
import transactionRouter from "./Routes/transactionRoutes.js";
// import requestRouter from "./routes/requestRoutes.js";

dotenv.config();


const app = express();
app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());


app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/support", supportRouter);
// app.use("/api/rates", rateRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/wallet", walletRouter);
app.use("/api/transactions", transactionRouter);
// app.use("/api/requests", requestRouter);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
