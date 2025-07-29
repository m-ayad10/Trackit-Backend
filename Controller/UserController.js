const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const { sendOtpEmail } = require("../utils/SendMail");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(204)
        .json({ message: "Please fill all fields", success: false });
    }
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .json({ message: "Email aldready exist", success: false });
    }
    const newData = new UserModel({ email, password });
    newData.password = await bcrypt.hash(password, 10);
    // var randomNum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    // sendOtpEmail(email,randomNum)
    await newData.save();
    res.status(200).json({ message: "SignUp successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error, success: false });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(401)
        .json({ message: "Incorrect password", success: false });
    }
     const key = process.env.SECRET_KEY;
    const jwtToken = jwt.sign(
      { id: user._id },
      key,
      { expiresIn: "24h" }
    );    
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true, 
      sameSite: "None",
    });
    res.status(200).json({ message: "SignIn Successfully", success: true, data:user._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

const verifyToken = async (req, res) => {
  try {
    
    const token = req.cookies.token;    
    if (!token) {
      return res.status(401).json({ message: "Access Denied", succuss: false });
    }
    const key = process.env.SECRET_KEY;
    const verify = await jwt.verify(token, key);
    if (verify) {
      res.status(200).json({ message: "", succuss: true, user: verify });
    } else {
      return res.status(401).json({ message: "Access Denied", success: false });
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
};

const signOut = (req, res) => {
  try {
    
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ message: "Logout successful", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = { Login, SignUp, verifyToken, signOut };
