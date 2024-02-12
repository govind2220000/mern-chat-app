import User from "../db/models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); //for more simplicity we can just select (-_id userName)

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Something went wrong in User Controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
