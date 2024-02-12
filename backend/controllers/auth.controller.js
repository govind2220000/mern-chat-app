import User from "../db/models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      userName,
      password,
      confirmPassword,
      gender,
      profilePic,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords dont match" });
    }
    const user = await User.findOne({ userName, email });
    //console.log(user);
    if (user) {
      return res.status(400).json({ error: "Username/Email already exists" });
    }

    //HASH THE PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      email,
      userName,
      fullName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      //Generate the token for the new user
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
        fullName: newUser.fullName,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(500).json({ error: "Invalid User data" });
    }
  } catch (error) {
    console.log("Something went wrong in Signup Controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    //console.log(userName, email, password);
    const user = await User.findOne({ $or: [{ userName }, { email }] });
    //console.log(user);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    //console.log(validPassword);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    //Generate the token for the new user
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Something went wrong in Login Controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); //easy emtho for clearing the cookies res.clearCookie("jwt");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.log("Something went wrong in Logout Controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
