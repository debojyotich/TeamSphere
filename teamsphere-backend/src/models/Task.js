// src/models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required"],
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  dueDate: {
    type: Date,
  },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
