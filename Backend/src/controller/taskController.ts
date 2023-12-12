import { Request, Response } from "express";
import Task from "../models/taskModel";
const taskController = {
  async createTask(req: Request, res: Response) {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the task." });
    }
  },
  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await Task.find();

      res.json(tasks);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching tasks." });
    }
  },
};

export default taskController;
