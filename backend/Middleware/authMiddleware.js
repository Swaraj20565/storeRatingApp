// middleware/verifyToken.js

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
      
  try {

    const token = req.cookies.accessToken;
    console.log("Received Token from Cookies:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token found",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRET
    );
    console.log("Decoded Token Data:", decoded);
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });

  }
};

module.exports = verifyToken;