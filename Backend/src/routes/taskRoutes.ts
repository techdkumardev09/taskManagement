import express from "express";
import taskController from "../controller/taskController";
import authenticateUser from "../middleware/authMiddleware";

const taskRoutes = express.Router();
taskRoutes.post("/",authenticateUser ,taskController.createTask);
taskRoutes.get("/", taskController.getAllTasks);
taskRoutes.get("/:id", taskController.getTaskById);
taskRoutes.delete("/:id", taskController.deleteTask);
taskRoutes.put("/:id", taskController.updateTask);

export default taskRoutes;
