import mongoose from "mongoose";

const withdrawalMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("WithdrawalMethod", withdrawalMethodSchema);
