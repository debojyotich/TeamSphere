// src/routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const {
  createTask,
  getTaskByProject,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require("../controllers/taskcontroller");

router.post("/", createTask);      // Create
router.get("/getTaskByProject/:projectId", getTaskByProject);       // Read By Project
router.get("/", getTasks);         // Read All
router.get("/:id", getTask);       // Read One
router.put("/:id", updateTask);    // Update
router.delete("/:id", deleteTask); // Delete

module.exports = router;


