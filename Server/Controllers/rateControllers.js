import Rate from "../models/Rate.js";

export const getRates = async (req, res) => {
  try {
    const rates = await Rate.find(); 
    return res.status(200).json({
      success: true,
      message: "Rates fetched successfully",
      rates: rates     
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Server error while fetching rates",
    });
  }
};
