import { NextFunction, Request, Response } from "express";
import { RequestType } from "../controller/userController";

export const userMiddleware = async (
  req: Request<RequestType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    if (!username || username === "")
      return res
        .status(404)
        .json({ errorMessage: "Username can not be blank" });
    else if (!password || password === "")
      return res
        .status(404)
        .json({ errorMessage: "Password can not be blank" });
    next();
  } catch (error) {}
};
