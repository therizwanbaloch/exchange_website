import mongoose from "mongoose";

const depositMethodSchema = new mongoose.Schema({
  gateway: { type: String, required: true },
  currency: { type: String, required: true },
  minAmount: { type: Number, required: true },
  maxAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("DepositMethod", depositMethodSchema);
