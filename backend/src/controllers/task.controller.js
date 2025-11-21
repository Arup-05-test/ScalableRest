const Task = require("../models/task.model");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description || "",
      user: req.user._id, // link task to the logged-in user
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get tasks (role-based)
exports.getTasks = async (req, res) => {
  const tasks =
    req.user.role === "admin"
      ? await Task.find().populate("user", "name email role")  // populate user info
      : await Task.find({ user: req.user._id }).populate("user", "name email role");

  res.json(tasks);
};


// Delete task (only owner or admin)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user._id.toString() && req.user.role !== "admin")
      return res.status(403).json({ msg: "Not authorized" });

    await task.deleteOne();
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
