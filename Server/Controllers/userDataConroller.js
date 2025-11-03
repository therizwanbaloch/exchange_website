import User from "../models/User.js";

export const getUserData = async (req, res) => {
  const userId = req.user?.id; 

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
