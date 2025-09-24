// src/routes/memberRoutes.js
const express = require("express");
const router = express.Router();
const {
  createMember,
  getMemberByProject,
  getMembers,
  getMember,
  updateMember,
  deleteMember
} = require("../controllers/membercontroller");

router.post("/", createMember);      // Create
router.get("/getMemberByProject/:projectId", getMemberByProject);       // Read By Project
router.get("/", getMembers);         // Read All
router.get("/:id", getMember);       // Read One
router.put("/:id", updateMember);    // Update
router.delete("/:id", deleteMember); // Delete

module.exports = router;