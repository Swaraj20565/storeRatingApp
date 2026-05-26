const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {

  try {

    const { fullName, email, password, address, role } = req.body;

    console.log("Received signup data:", {
      fullName,
      email,
      password,
      address,
      role,
    });

    // Check Existing User
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
        address,
        role,
      },
    });
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" }
    )
    console.log("Generated Access Token:", process.env.REFRESH_SECRET);
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    )
    console.log("Generated Tokens:", {
      accessToken,
      refreshToken,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    // Response
    res.status(201).json({
      success: true,
      message: "Signup Successful",
      accessToken,
      refreshToken,
      user,
    });



  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    console.log("Received login data:", {
      email,
      password,
    });
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    // Check Existing User
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log("Existing User:", existingUser);

    // User Not Found
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Password Check


    const isMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const accessToken = jwt.sign(
      { id: existingUser.id },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" }
    )
    console.log("Generated Access Token:", process.env.REFRESH_SECRET);
    const refreshToken = jwt.sign(
      { id: existingUser.id },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    )
    console.log("Generated Tokens:", {
      accessToken,
      refreshToken,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });


    // Success Response
    res.status(200).json({
      success: true,
      message: "Login Successful",

      user: {
        id: existingUser.id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        role: existingUser.role,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const logout = async (req, res) => {
  try {
console.log("Logout Request Received");
    // Clear Access Token Cookie
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // Clear Refresh Token Cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // Success Response
    res.status(200).json({
      success: true,
      message: "Logout Successful",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}; 
module.exports = {
  signup, login, logout
};