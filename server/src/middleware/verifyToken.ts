import { NextFunction, Request, Response } from "express";
import admin from "../firebase/config";

declare global {
  namespace Express {
    interface Request {
      user_id?: string;
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: "Missing authorization header" });
      return;
    }

    const [tokenType, token] = authHeader.split(" ");

    if (tokenType !== "Bearer" || !token) {
      res.status(401).json({ error: "Invalid authorization header" });
      return;
    }

    const decoded = await admin.auth().verifyIdToken(token);
    req.user_id = decoded.uid;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
