import { Request, Response } from "express";
import Task from "../models/taskModel";
const taskController = {
  async createTask(req: Request, res: Response) {
    try {
      const task = await Task.create(req.body);
      res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to create the task. Please try again later." });
    }
  },
  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await Task.find();

      res.json({ message: "Tasks fetched successfull", tasks });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch tasks. Please try again later." });
    }
  },
  async getTaskById(req: Request, res: Response) {
    try {
      const task = await Task.findById(req.params.id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch the task. Please try again later." });
    }
  },
  async deleteTask(req: Request, res: Response) {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (task) {
        res.json({ message: "Task deleted successfully !" });
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to delete the task. Please try again later." });
    }
  },
  async updateTask(req: Request, res: Response) {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (task) {
        res.json({ message: "Task updated successfully", task });
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to update the task. Please try again later." });
    }
  },
};

export default taskController;
