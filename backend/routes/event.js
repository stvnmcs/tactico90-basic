const express = require("express");
const Event = require("../models/event.js");
const auth = require("../middleware/auth.js");
const admin = require("../middleware/admin.js");
const router = express.Router();

// Create event (Admin only)
router.post("/", auth, admin, async (req, res) => {
  try {
    const newEvent = new Event({ ...req.body, createdBy: req.user.userId });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update event (Admin only)
router.put("/:id", auth, admin, async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete event (Admin only)
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

