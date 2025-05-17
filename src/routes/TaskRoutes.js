const router = require("express").Router();
const Task = require("../models/TaskModel");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const tasks = await Task.find({ projectId: id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("error in /:id task route", error);
  }
});

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description, status } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      status,
      projectId: id,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("error in /:id task route", error);
  }
});

router.put("/", async (req, res) => {
  const { title, description, status, completedby, taskid } = req.body;
  try {
    const newtask = await Task.findByIdAndUpdate(
      taskid,
      { title, description, status, completedAt: completedby },
      { new: true }
    );
    res.status(200).json(newtask);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("error in /:id task route", error);
  }
});



router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(id);
    res.status(200).json({message: "task deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("error in /:id task route", error);
  }
});

module.exports = router;

