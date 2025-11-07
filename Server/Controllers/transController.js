import Transaction from "../models/Transaction.js";
import User from "../models/User.js";


export const deposit = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { amount, wallet } = req.body;

    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access – please log in again.",
      });
    }

  
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid amount greater than zero.",
      });
    }

    
    if (!wallet || !["PKR", "USD", "GBP"].includes(wallet)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid wallet (PKR, USD, or GBP).",
      });
    }

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please try again.",
      });
    }

    if (!user.wallet) {
      user.wallet = { PKR: 0, USD: 0, GBP: 0 };
      await user.save();
    }

    const transaction = new Transaction({
      user: userId,
      type: "deposit",
      toWallet: wallet,
      amount,
      status: "pending",
    });

    await transaction.save();

    return res.status(201).json({
      success: true,
      message: `Deposit request to ${wallet} wallet submitted successfully. Awaiting admin approval.`,
      transaction,
    });
  } catch (error) {
    console.error("Deposit Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong on the server.",
      error: error.message,
    });
  }
};


export const withdraw = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { amount, wallet } = req.body;

    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access – please log in.",
      });
    }

    
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid withdrawal amount greater than zero.",
      });
    }

    
    if (!wallet || !["PKR", "USD", "GBP"].includes(wallet)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid wallet.",
      });
    }

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    
    if (!user.wallet) {
      user.wallet = { PKR: 0, USD: 0, GBP: 0 };
      await user.save();
    }

    
    if (user.wallet[wallet] < amount) {
      return res.status(400).json({
        success: false,
        message: `Insufficient balance in ${wallet} wallet.`,
      });
    }

    
    const transaction = new Transaction({
      user: userId,
      type: "withdraw",
      fromWallet: wallet,
      amount,
      status: "pending",
    });

    await transaction.save();

    return res.status(201).json({
      success: true,
      message: "Withdrawal request submitted successfully. Admin will review it.",
      transaction,
    });
  } catch (error) {
    console.error("Withdraw Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


export const getAllTransactions = async (req, res) => {
   try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find()
      .populate("user", "email") 
      .sort({ createdAt: -1 })    
      .skip(parseInt(skip))
      .limit(parseInt(limit));

  
    const total = await Transaction.countDocuments();

    return res.status(200).json({
      success: true,
      transactions,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalTransactions: total
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching transactions",
      error: error.message
    });
  }
};


export const recentTransactions = async (req, res) => {
  try {
    const userId = req.user.id; 
    const transactions = await Transaction.find({ user: userId })
      .populate("user", "email")
      .sort({ createdAt: -1 })
      .limit(6);

    return res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user transactions",
      error: error.message,
    });
  }
};
