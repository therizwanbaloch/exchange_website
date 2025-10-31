import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const deposit = async (req, res) => {
  try {
    const userId = req.user?.id; 
    const { amount } = req.body;

    
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

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please try again.",
      });
    }

    
    const transaction = new Transaction({
      user: userId,
      type: "deposit",
      amount,
      status: "pending",
    });

    await transaction.save();

    
    return res.status(201).json({
      success: true,
      message: "Deposit request submitted successfully. Awaiting admin approval.",
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
