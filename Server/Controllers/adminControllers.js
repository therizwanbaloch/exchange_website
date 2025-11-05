import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      res.status(404).json({
        success: false,
        message: "No User Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user data Fetched Successfully",
      users,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `An unknow error Occured While Getting UsersInfo ${error}`,
    });
  }
};
