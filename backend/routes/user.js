const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const router = express.Router();

// POST: Create a new user
router.post("/", async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
  
      // Ensure the role is assigned or defaults to 'user'
      const newUser = new User({
        username,
        email,
        role: role || 'user', // Default to 'user' if no role is provided
      });
  
      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Set the hashed password to the new user
      newUser.password = hashedPassword;
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json(newUser); // Respond with the created user (excluding password)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create user" });
    }
});

module.exports = router;
