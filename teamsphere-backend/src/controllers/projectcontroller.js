// src/controllers/projectcontroller.js
const Project = require("../models/Project");
const Task = require("../models/Task");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get All Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    
    res.json({ success: true, count: projects.length, data: projects })
    .populate("createdBy", "name email");;
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Projects with task
exports.getProjectsWithTask = async (req, res) => {
  const findall =req.params.findAll;
  //console.log("in getProjectsWithTask");
  try {
     

    const projects =   await Project.aggregate([{
      $lookup: {
        from: "tasks",        // The collection to join with
      localField: "_id", // Field from the input documents (orders)
      foreignField: "projectId",      // Field from the "from" collection (customers)
      as: "tasks"       // Output array field name
      }
    }
]) ;
 console.log("in getProjectsWithTask1:"+projects);
    
    res.json({ success: true, count: projects.length, data: projects })
    .populate("createdBy", "name email");;
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Single Project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: "Project not found" });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!project) return res.status(404).json({ success: false, error: "Project not found" });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: "Project not found" });
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

