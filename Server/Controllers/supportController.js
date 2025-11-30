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


export const getTicketDetails = async (req, res) => {
  try {
    const userId = req.user.id; 
    const ticketId = req.params.ticketId;

    const ticket = await SupportTicket.findOne({
      _id: ticketId,
      userId: userId
    });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const updateTicketStatus = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { status, adminReply } = req.body; 

    
    if (!["resolved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = status;
    if (adminReply) ticket.adminReply = adminReply;

    await ticket.save();

    return res.status(200).json({ message: `Ticket marked as ${status}`, ticket });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};