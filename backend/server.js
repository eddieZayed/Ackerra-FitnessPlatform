require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

// Existing routes
const userRoutes = require("./routes/userRoutes");
const supplementRoutes = require("./routes/supplementRoutes");
const sportsRoutes = require("./routes/sportsRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Serve images from "public/images"
app.use("/images", express.static("public/images"));

// Connect to MongoDB
connectDB();

// Existing route mounts
app.use("/api/users", userRoutes);
app.use("/api/supplements", supplementRoutes);
app.use("/api/sports", sportsRoutes);
app.use("/api/chat", chatRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
