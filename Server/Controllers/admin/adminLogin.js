import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  
  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  
  const payload = { role: "admin", email: adminEmail };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

  
  return res.status(200).json({
    success: true,
    message: "Admin login successful",
    token,
  });
};
