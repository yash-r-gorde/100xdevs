import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()

export const authCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization
  if (!authorization || !authorization.startsWith('Bearer')) {
    res.status(400).json({
      message: "Access denied: invalid token"
    })
  }
  const token = authorization?.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Access denied: invalid token"
    });
  }
};