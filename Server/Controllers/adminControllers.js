import SupportTicket from "../models/SupportTicket.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      res.status(404).json({
        success: false,
        message: "No User Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user data Fetched Successfully",
      users,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `An unknow error Occured While Getting UsersInfo ${error}`,
    });
  }
};



// get pending tickets 


export const getPendingTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ status: "pending" })
      .populate('userId', 'email')
      .sort({ createdAt: -1 });

    res.status(200).json({success: true , message: "All tickets Got Successfuly" ,tickets });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending tickets" });
  }
};


// get all tickets.... 


export const getAllTickets = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query; 
    const skip = (page - 1) * limit;

    const tickets = await SupportTicket.find()
      .populate('userId', 'email')
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const total = await SupportTicket.countDocuments(); 

    res.status(200).json({
      tickets,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalTickets: total
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};



 // Approve Transaction
export const approveTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.status = "approved";
    await transaction.save();

    return res.status(200).json({
      success: true,
      message: "Transaction approved successfully",
      transaction,
    });
  } catch (error) {
    console.error("Error approving transaction:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Reject Transaction
export const rejectTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.status = "rejected";
    await transaction.save();

    return res.status(200).json({
      success: true,
      message: "Transaction rejected successfully",
      transaction,
    });
  } catch (error) {
    console.error("Error rejecting transaction:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
