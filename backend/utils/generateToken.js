import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //Token expires in 15 days
    httpOnly: true, //prevent XSS attacks cross site scripting attacks
    sameSite: "strict", //CSRF attack protection
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
