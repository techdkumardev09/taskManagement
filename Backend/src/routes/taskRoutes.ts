import express from "express";
import taskController from "../controller/taskController";
import authenticateUser from "../middleware/authMiddleware";

const taskRoutes = express.Router();
taskRoutes.post("/create", authenticateUser, taskController.createTask);
taskRoutes.get("/get-all", authenticateUser, taskController.getAllTasks);
taskRoutes.get("/:id", authenticateUser, taskController.getTaskById);
taskRoutes.delete("/:id", authenticateUser, taskController.deleteTask);
taskRoutes.put("/:id", authenticateUser, taskController.updateTask);

export default taskRoutes;
