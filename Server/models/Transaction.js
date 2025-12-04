import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    type: {
      type: String,
      enum: ["deposit", "withdraw", "exchange"],
      required: true,
    },

    fromWallet: { type: String },
    toWallet: { type: String },

    amount: { type: Number, required: true },
    convertedAmount: { type: Number },
    rate: { type: Number },

    
    transactionId: { type: String, required: true },

    paymentApp: { type: String },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
