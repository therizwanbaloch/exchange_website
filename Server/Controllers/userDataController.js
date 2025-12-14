import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const getUserData = async (req, res) => {
  const userId = req.user?.id || req.use._id;


  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access – please log in again.",
    });
  }

  try {
    
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Error fetching user data:", err);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};


// update user data  

export const updateUserData = async (req, res) => {
  
  try {
    const userId = req.user.id;
    const { name, password } = req.body;

    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    

    if (name && name.trim() !== "") {
      user.name = name.trim();
    }

    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password.trim(), salt);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
