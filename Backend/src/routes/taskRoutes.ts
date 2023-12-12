import express from "express";
import taskController from "../controller/taskController";

const taskRoutes = express.Router();
taskRoutes.post("/", taskController.createTask);
taskRoutes.get("/", taskController.getAllTasks);

export default taskRoutes;
