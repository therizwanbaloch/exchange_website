import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  PKR: { type: Number, default: 0 },
  USD: { type: Number, default: 0 },
  GBP: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wallet: walletSchema,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
