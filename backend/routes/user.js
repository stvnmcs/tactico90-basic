const express = require("express");
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
        password, // Ideally, hash the password before saving
        role: role || 'user', // Default to 'user' if no role is provided
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json(newUser); // Respond with the created user
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create user" });
    }
});
  

module.exports = router;
