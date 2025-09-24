// src/routes/projectRoutes.js
const express = require("express");
//const { getProjects } = require("../controllers/projectcontroller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
//router.get("/", protect, getProjects);
const {
  createProject,
  getProjectsWithTask,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} = require("../controllers/projectcontroller");

router.post("/", createProject);      // Create
router.get("/getProjectsWithTask/:findAll", getProjectsWithTask); 
router.get("/", getProjects);   
router.get("/:id", getProject);       // Read One
router.put("/:id", updateProject);    // Update
router.delete("/:id", deleteProject); // Delete

module.exports = router;
