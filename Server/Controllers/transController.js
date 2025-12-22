import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import depositMethod from "../models/depositMethod.js"
import Rate from "../models/Rate.js"


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

// withdraw 
export const withdraw = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { wallet, methodName, amount, holderName, accountNumber } = req.body;

    if (!wallet || !amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    const user = await User.findById(userId);
    if (!user || user.wallet[wallet] < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }

    
    const fee = amount * 0.01;
    const finalAmount = amount - fee;

    
    user.wallet[wallet] -= amount;
    await user.save();

    const transaction = await Transaction.create({
      user: userId,
      type: "withdraw",
      fromWallet: wallet,
      amount,
      convertedAmount: finalAmount,
      rate: 1,
      transactionId: `WD-${Date.now()}`,
      paymentApp: methodName,
      status: "pending",
      holderName,
      accountNumber,
    });

    return res.status(201).json({
      success: true,
      message: "Withdrawal request submitted",
      transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all transactions

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

// Get conversion amount

export const getConversionAmount = async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    if (!from || !to || !amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.wallet[from] < amount) {
      return res.status(400).json({ success: false, message: `Insufficient ${from} balance` });
    }

    const rateDoc = await Rate.findOne({ fromCurrency: from, toCurrency: to });
    if (!rateDoc) return res.status(404).json({ success: false, message: "Exchange rate not found" });

    const receiveAmount = amount * rateDoc.rate;

    res.json({ success: true, receiveAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Perform actual exchange

export const performExchange = async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    if (!from || !to || !amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.wallet[from] < amount) {
      return res.status(400).json({ success: false, message: `Insufficient ${from} balance` });
    }

    const rateDoc = await Rate.findOne({ fromCurrency: from, toCurrency: to });
    if (!rateDoc) return res.status(404).json({ success: false, message: "Exchange rate not found" });

    const receiveAmount = amount * rateDoc.rate;

    
    user.wallet[from] -= amount;
    user.wallet[to] += receiveAmount;

    await user.save();

    res.json({ success: true, message: "Exchange successful", receiveAmount, wallet: user.wallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
