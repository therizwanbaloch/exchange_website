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


export const updateRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { fromCurrency, toCurrency, rate } = req.body;

    const updatedRate = await Rate.findByIdAndUpdate(
      id,
      {
        fromCurrency,
        toCurrency,
        rate,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedRate) {
      return res.status(404).json({ message: "Rate not found" });
    }

    res.status(200).json({
      message: "Rate updated successfully",
      rate: updatedRate, 
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating rate", error: error.message });
  }
};


export const deleteRate = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRate = await Rate.findByIdAndDelete(id);

    if (!deletedRate) {
      return res.status(404).json({ message: "Rate not found" });
    }

    res.status(200).json({
      message: "Rate deleted successfully",
      rate: deletedRate,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting rate", error: error.message });
  }
};
