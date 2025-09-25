// src/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", require("./src/routes/taskRoutes"));
app.use("/api/projects", require("./src/routes/projectRoutes"));
app.use("/api/members", require("./src/routes/memberRoutes"));
app.use("/api/auth", require("./src/routes/authRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
