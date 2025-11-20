import { Request, Response, NextFunction } from "express";
import { pool } from "../index";

export const requireProjectOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user_id;
    if (!userId) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const projectId =
      (req.params.project_id as string) ||
      (req.query.project_id as string) ||
      (req.body.project_id as string);

    if (!projectId) {
      res.status(400).json({ error: "project_id is required" });
      return;
    }

    const { rows } = await pool.query(
      `SELECT *
       FROM members
       WHERE project_id = $1 AND id = $2 AND role = 'owner'`,
      [projectId, userId]
    );

    if (rows.length === 0) {
      res.status(403).json({ error: "Not an owner of this project" });
      return;
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
