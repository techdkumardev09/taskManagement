import express from "express";
import { userMiddleware } from "../middleware/userMiddleware";
import userController from "../controller/userController";

const userRouters = express.Router();

userRouters.post("/signup", userMiddleware, userController.signUp);
userRouters.post("/login", userMiddleware, userController.login);

export default userRouters;
