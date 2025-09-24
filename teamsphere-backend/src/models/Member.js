// src/models/Members.js
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Member name is required"],
  },
  email: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["Female", "Male"],
    default: "Male",
  },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project"  }
}, { timestamps: true });

module.exports = mongoose.model("Member", memberSchema);
