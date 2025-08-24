const jwt = require("jsonwebtoken");
const User = require("C:\Users\hp\SMVP\server\models\userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.body);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id);
      if (req.user.role !== "admin") {
        console.log("not admin login");
        return res.status(401).json({ success: false, message: "Not admin" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Authorization failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
});

const fetchChatsProtect = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.body);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id);

      // Skip admin role check for fetchChats route
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Authorization failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
});




module.exports = { protect, fetchChatsProtect };