import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { tokenBlacklist } from '../controller/authController';

// Import the tokenBlacklist array from your authController

const authenticateUser = (req: any, res: Response, next: NextFunction) => {
  const authToken = req.header('Authorization');

  if (!authToken) {
    return res.status(401).json({ error: 'Authorization header missing.' });
  }

  const token = authToken.split(' ')[1];

  // Check if the token is in the blacklist


  try {
    const decoded = jwt.verify(token, `${process.env.JWT_TOKEN}`) as { username: string };
    req.user = { username: decoded.username };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid authorization token.' });
  }
};

export default authenticateUser;
