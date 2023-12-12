import express from "express";
import taskController from "../controller/taskController";

const taskRoutes = express.Router();
taskRoutes.post("/", taskController.createTask);
taskRoutes.get("/", taskController.getAllTasks);
taskRoutes.get("/:id", taskController.getTaskById);
taskRoutes.delete("/:id", taskController.deleteTask);
taskRoutes.put("/:id", taskController.updateTask);

export default taskRoutes;
