const express = require("express");
const { v4: uuidv4 } = require("uuid");

const {
  readTasks,
  writeTasks,
} = require("../utils/fileHandler");

const router = express.Router();

// GET ALL TASKS
router.get("/", async (req, res) => {
  try {
    const tasks = await readTasks();

    tasks.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

// CREATE TASK
router.post("/", async (req, res) => {
  try {
    const { title, description, dueDate } =
      req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const tasks = await readTasks();

    const newTask = {
      id: uuidv4(),
      title,
      description: description || "",
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

// UPDATE TASK
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, dueDate } = req.body;
  
      const tasks = await readTasks();
  
      const taskIndex = tasks.findIndex(
        (task) => task.id === id
      );
  
      if (taskIndex === -1) {
        return res.status(404).json({
          message: "Task not found",
        });
      }
  
      if (!title || !title.trim()) {
        return res.status(400).json({
          message: "Title is required",
        });
      }
  
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        title,
        description,
        dueDate,
      };
  
      await writeTasks(tasks);
  
      res.status(200).json(tasks[taskIndex]);
    } catch (error) {
      res.status(500).json({
        message: "Failed to update task",
      });
    }
  });

// TOGGLE TASK
router.patch("/:id/toggle", async (req, res) => {
  try {
    const { id } = req.params;

    const tasks = await readTasks();

    const task = tasks.find(
      (task) => task.id === id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.completed = !task.completed;

    await writeTasks(tasks);

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to toggle task",
    });
  }
});

// DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const tasks = await readTasks();

    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    if (tasks.length === updatedTasks.length) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await writeTasks(updatedTasks);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

module.exports = router;