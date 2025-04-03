const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "User not found" });
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
  
      // Generate JWT Token
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }

    
  });
  
  module.exports = router;