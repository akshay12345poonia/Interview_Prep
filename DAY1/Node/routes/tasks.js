const express = require("express");
const router  = express.Router();
const { body, validationResult } = require("express-validator");
const Task    = require("../models/Task");


router.post(
  "/tasks",
  body("title").notEmpty().withMessage("Title is required"),
  body("status").optional().isIn(["pending","in progress","done"])
               .withMessage("Invalid status value"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const task = new Task(req.body);
      const saved = await task.save();

      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
    
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put(
  "/tasks/:id",
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("status").optional().isIn(["pending","in progress","done"])
               .withMessage("Invalid status value"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const updated = await Task.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
      );
      if (!updated) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.delete("/tasks/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
