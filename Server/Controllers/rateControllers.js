import Rate from "../models/Rate.js";

export const getRates = async (req, res) => {
  try {
    const rates = await Rate.find();
    return res.status(200).json({
      success: true,
      message: "Rates fetched successfully",
      rates: rates,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching rates",
    });
  }
};

export const createRate = async (req, res) => {
  const { fromCurrency, toCurrency, rate } = req.body;
  if (!fromCurrency || !toCurrency || !rate) {
    res
      .status(400)
      .json({ success: false, message: "All Fields Are Required" });
  }

  if (isNaN(rate) || rate <= 0) {
    res.status(400).json({ success: false, message: "Invalid Rate Values" });
  }

  const existingRates = await Rate.findOne({ fromCurrency, toCurrency });

  if (existingRates) {
    existingRates.rate = rate;
    existingRates.updatedAt = Date.now();
    await existingRates.save();
    return res.json({
      success: true,
      message: "Rate updated",
      rate: existingRates,
    });
  }

  const newRate = new Rate({ fromCurrency, toCurrency, rate });
  await newRate.save();
  return res
    .status(201)
    .json({ success: true, message: "Rate created", rate: newRate });
};
