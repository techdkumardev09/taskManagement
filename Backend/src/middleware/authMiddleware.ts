import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateUser = (req: any, res: Response, next: NextFunction) => {
  const authToken = req.header("authorization");

  if (!authToken) {
    return res.status(401).json({ error: "Authorization header missing." });
  }

  const token = JSON.parse(authToken);

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_TOKEN}`) as {
      email: string;
    };
    req.params.email = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid authorization token." });
  }
};

export default authenticateUser;
