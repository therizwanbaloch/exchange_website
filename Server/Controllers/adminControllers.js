import SupportTicket from "../models/SupportTicket.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import DepositMethod from "../models/depositMethod.js";
import jwt from "jsonwebtoken";
import WithdrawalMethod from "../models/WithdrawalMethod.js"

//get all users

export const getAllUsers = async (req, res) => {
  try {
    
    let { page = 1, limit = 20 } = req.query;

    page = Number(page) || 1;
    limit = Number(limit) || 20;

    const skip = (page - 1) * limit;

    
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    
    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// search users by email

export const searchUsersByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email to search",
      });
    }

    const users = await User.find({ 
      email: { $regex: email, $options: "i" } 
    }).select("-password").sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
      totalUsers: users.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while searching users",
      error: error.message,
    });
  }
};

// get recent users

export const getRecentUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ createdAt: -1 })  
      .limit(5)
      .select("name email createdAt");

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
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
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    
    if (transaction.status === "approved") {
      return res.status(400).json({ success: false, message: "Transaction already approved" });
    }

    
    const user = await User.findById(transaction.user);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

  
    const currency = transaction.paymentApp;
    if (!user.wallet[currency]) {
      
      user.wallet[currency] = 0;
    }
    user.wallet[currency] += transaction.amount;

    
    await user.save();

    
    transaction.status = "approved";
    await transaction.save();

    return res.status(200).json({
      success: true,
      message: "Transaction approved successfully and wallet updated",
      transaction,
      wallet: user.wallet
    });
  } catch (error) {
    console.error("Error approving transaction:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
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

    
    const user = await User.findById(transaction.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    user.wallet[transaction.fromWallet] += transaction.amount;
    await user.save();

    
    transaction.status = "rejected";
    await transaction.save();

    return res.status(200).json({
      success: true,
      message: "Transaction rejected and amount returned to wallet",
      transaction,
    });
  } catch (error) {
    console.error("Reject transaction error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// get all despoits ...

export const getAllDeposits = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const deposits = await Transaction.find({ type: "deposit" })
      .populate("user", "email")
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Transaction.countDocuments({ type: "deposit" });

    res.status(200).json({
      success: true,
      message: "All deposits fetched successfully",
      deposits,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalDeposits: total,
    });
  } catch (error) {
    console.error("Error fetching deposits:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Get all pending deposits
export const getPendingDeposits = async (req, res) => {
  try {
    
    const pendingDeposits = await Transaction.find({
      type: "deposit",
      status: "pending"
    }).populate("user", "name email");

    res.json(pendingDeposits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


// get all Cashouts

export const getAllWithdrawals = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const withdrawals = await Transaction.find({ type: "withdraw" })
      .populate("user", "email")
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Transaction.countDocuments({ type: "withdraw" });

    res.status(200).json({
      success: true,
      message: "All withdrawals fetched successfully",
      withdrawals,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalWithdrawals: total,
    });
  } catch (error) {
    console.error("Error fetching withdrawals:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all pending withdrawals

export const getPendingWithdraws = async (req, res) => {
  try {
    const pendingWithdraws = await Transaction.find({
      type: "withdraw",
      status: "pending"
    }).populate("user", "name email"); 

    res.json(pendingWithdraws);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


// get ticket details......

export const getTicketDetailsAdmin = async (req, res) => {
  try {
    const ticketId = req.params.id; 

    const ticket = await SupportTicket.findById(ticketId).populate("userId", "email");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// get dashboard stats

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const totalDeposits = await Transaction.countDocuments({ type: "deposit" });
    const totalWithdraws = await Transaction.countDocuments({ type: "withdraw" });

    res.json({
      totalUsers,
      totalTransactions,
      totalDeposits,
      totalWithdraws,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
// Create a new deposit method

export const createDepositMethod = async (req, res) => {
  try {
    const { gateway, currency, address, depositUrl, instructions, minAmount, maxAmount } = req.body;

    
    if (!gateway || !currency || !address || !minAmount || !maxAmount) {
      return res.status(400).json({ message: "Gateway, currency, address, minAmount and maxAmount are required." });
    }

    
    if (minAmount > maxAmount) {
      return res.status(400).json({ message: "minAmount cannot be greater than maxAmount." });
    }

    
    const adminId = req.user.id;

    const newMethod = await DepositMethod.create({
      gateway,
      currency,
      address,
      depositUrl,      
      instructions,    
      minAmount,
      maxAmount,
    });

    res.status(201).json({
      success: true,
      message: "Deposit method created successfully",
      method: newMethod,
    });
  } catch (err) {
    console.error("Error creating deposit method:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all deposit methods
export const getDepositMethods = async (req, res) => {
  try {
    const methods = await DepositMethod.find().sort({ createdAt: -1 });
    res.status(200).json(methods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// update deposit method 

export const updateDepositMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { gateway, currency, minAmount, maxAmount, address, instructions } =
      req.body;

    
    const method = await DepositMethod.findById(id);
    if (!method) {
      return res.status(404).json({
        success: false,
        message: "Deposit method not found",
      });
    }

    
    if (gateway !== undefined) method.gateway = gateway;
    if (currency !== undefined) method.currency = currency;
    if (minAmount !== undefined) method.minAmount = minAmount;
    if (maxAmount !== undefined) method.maxAmount = maxAmount;
    if (address !== undefined) method.address = address;
    if (instructions !== undefined) method.instructions = instructions;

    await method.save();

    return res.json({
      success: true,
      message: "Deposit method updated successfully",
      method,
    });
  } catch (err) {
    console.error("Update deposit method error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// DELETE deposit method

 export const deleteDepositMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const method = await DepositMethod.findById(id);
    if (!method) {
      return res.status(404).json({ message: "Deposit method not found" });
    }

    await method.deleteOne();

    res.json({ message: "Deposit method deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// get deposit details 

export const getDepositById = async (req, res) => {
  try {
    const { id } = req.params;

    const deposit = await Transaction.findOne({
      _id: id,
      type: "deposit",
    }).populate("user", "name email");

    if (!deposit) {
      return res.status(404).json({
        success: false,
        message: "Deposit not found",
      });
    }

    return res.status(200).json({
      success: true,
      deposit,
    });
  } catch (err) {
    console.error("Error finding deposit by ID:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const getDepositByTransactionId = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const deposit = await Transaction.findOne({
      transactionId,
      type: "deposit",
    }).populate("user", "name email");

    if (!deposit) {
      return res.status(404).json({
        success: false,
        message: "No deposit found with this transaction ID",
      });
    }

    return res.status(200).json({
      success: true,
      deposit,
    });
  } catch (err) {
    console.error("Error finding deposit by transaction ID:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// get all withdrawal methods 

export const getWithdrawalMethods = async (req, res) => {
  try {
    const methods = await WithdrawalMethod.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, methods });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch methods" });
  }
};

// create withdrawal method 

export const createWithdrawalMethod = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Method name is required" });
    }

    const method = await WithdrawalMethod.create({ name: name.trim() });

    res.status(201).json({ success: true, method });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create method" });
  }
};

// delete withdrawal method 

export const deleteWithdrawalMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const method = await WithdrawalMethod.findById(id);
    if (!method) {
      return res.status(404).json({ success: false, message: "Method not found" });
    }

    await method.deleteOne();

    res.status(200).json({ success: true, message: "Withdrawal method deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete method" });
  }
};