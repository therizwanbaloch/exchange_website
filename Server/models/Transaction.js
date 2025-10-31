const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["deposit", "withdraw", "send", "exchange"], required: true },
  fromWallet: String,
  toWallet: String,
  amount: { type: Number, required: true },
  convertedAmount: Number,
  rate: Number,
  receiverEmail: String,
  message: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
