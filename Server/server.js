import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRouter from "./Routes/authRoutes.js";
import rateRouter from "./Routes/rateRoutes.js";
import transactionRouter from "./Routes/transactionRoutes.js";
import adminRouter from "./Routes/adminRoutes.js";
import userdataRouter from "./Routes/userDataRoutes.js";
import supportRouter from "./Routes/supportRoutes.js";

dotenv.config();

const app = express();
app.use(express.json())


app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        ["http://localhost:5173", "https://pkrspot.vercel.app"].includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get('/health', (req, res) => {
  res.send('Server is Running!'); 
});


app.use("/api/auth", authRouter);
app.use("/api/user-data", userdataRouter);
app.use("/api/support", supportRouter);
app.use("/api/rates", rateRouter);
app.use("/api/admin", adminRouter);
app.use("/api/users", userdataRouter);
app.use("/api/transactions", transactionRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
