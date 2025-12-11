import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import depositMethod from "../models/depositMethod.js"


export const getGatewayNames = async (req, res) => {
  try {
    
    const methods = await depositMethod.find({}, { gateway: 1, _id: 1 });
    return res.status(200).json({ success: true, methods });
  } catch (error) {
    console.error("Error fetching gateway names:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch gateway names.",
    });
  }
};

// get gateway details by id

export const getGatewayDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const method = await depositMethod.findById(id);

    if (!method) {
      return res.status(404).json({
        success: false,
        message: "Deposit method not found.",
      });
    }

    return res.status(200).json({ success: true, method });
  } catch (error) {
    console.error("Error fetching gateway details:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch gateway details.",
    });
  }
};

//deposit 
export const createDeposit = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { methodId, amount, transactionId } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Please enter a valid amount" });
    }

    if (!transactionId) {
      return res.status(400).json({ success: false, message: "Transaction ID is required" });
    }

    const method = await depositMethod.findById(methodId);
    if (!method) {
      return res.status(404).json({ success: false, message: "Selected deposit method not found" });
    }

    if (amount < method.minAmount || amount > method.maxAmount) {
      return res.status(400).json({
        success: false,
        message: `Amount must be between ${method.minAmount} and ${method.maxAmount}`,
      });
    }

    const transaction = new Transaction({
      user: userId,
      type: "deposit",
      toWallet: method.address,       
      amount,
      transactionId,
      paymentApp: method.currency,
      status: "pending",
    });

    await transaction.save();

    return res.status(201).json({
      success: true,
      message: "Deposit request submitted. Awaiting admin approval.",
      transaction,
    });

  } catch (error) {
    console.error("Deposit Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
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
      .limit(10);

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


// get transaction details

export const getDepositById = async (req, res) => {
  try {
    const { id } = req.params;

    
    const deposit = await Transaction.findById(id).populate("user", "email name");

    if (!deposit) {
      return res.status(404).json({ message: "Deposit not found" });
    }

    res.status(200).json({ deposit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};