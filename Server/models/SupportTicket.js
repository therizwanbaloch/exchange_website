import mongoose  from "mongoose";

const supportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "pending" },
  adminReply: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("SupportTicket", supportSchema);
