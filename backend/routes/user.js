const express = require("express");
const User = require("../models/user.js");
const router = express.Router();

// POST: Create a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user
    const newUser = new User({
      username,
      email,
      password, // Ideally, you should hash the password before saving it
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
