// routes/task.js
const express = require('express');
const router = express.Router();

function createTaskRoutes(Task) {
  // Create a new task
  router.post('/tasks', async (req, res) => {
    try {
      const { title, completed } = req.body;
      const newTask = await Task.create({ title, completed });
      res.status(201).json(newTask);
    } catch (err) {
      res.status(500).json({ error: 'Error creating task' });
    }
  });

  // Get all tasks
  router.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.findAll();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving tasks' });
    }
  });

  // Get a specific task by ID
  router.get('/tasks/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving task' });
    }
  });

  // Update a task by ID
  router.put('/tasks/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      const { title, completed } = req.body;
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      task.title = title || task.title;
      // task.description = description || task.description;
      task.completed = completed === undefined ? task.completed : completed;
      await task.save();
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: 'Error updating task' });
    }
  });

  // Delete a task by ID
  router.delete('/tasks/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      await task.destroy();
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting task' });
    }
  });

  return router;
}

module.exports = createTaskRoutes;
