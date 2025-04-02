require("dotenv").config({ path: "./backend/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const eventRoutes = require("./routes/event.js"); // Import the event routes
const userRoutes = require("./routes/user.js");
const authRoutes = require("./routes/auth.js");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4000',  // Or your specific front-end address
    methods: ['GET', 'POST'],
}));
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("Tactico 90 v2.0 API is running...");
});

// Use the event routes
app.use("/api/users", userRoutes); // Add the user route
app.use("/api/events", eventRoutes);  // Add this line to handle event-related requests


// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
