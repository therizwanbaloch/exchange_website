import SupportTicket from "../models/SupportTicket.js";

export const createTicket = async (req, res) => {
  try {
    const userId = req.user.id;
    const { subject, message } = req.body;

    if (!subject || !message) {
      res
        .status(400)
        .json({ success: false, message: "All Fields Are Required!" });
    }

    const newTicket = new SupportTicket({
      userId,
      subject,
      message,
    });

    await newTicket.save();

    res
      .status(201)
      .json({ message: "Ticket created successfully", ticket: newTicket });
  } catch (error) {
    res.status(401).json({ success: false, message: "internal server error" });
  }
};



export const getUserTickets = async (req, res) => {
  try {
    const userId = req.user.id;
    const tickets = await SupportTicket.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ tickets });
  } catch (err) {
    res.status(500).json({ message: "Error fetching tickets", error: err.message });
  }
};
