import { Request, Response } from "express";
import { pool } from "../../index";

export const getTasks = async (req: Request, res: Response) => {
  const projectId = req.query.project_id as string;

  if (!projectId) {
    res.status(400).json({ error: "project_id is required" });
    return;
  }

  try {
    const { rows: tasks } = await pool.query(
      `SELECT id, status_id, created_by, assigned_to, title, description, position, created_on
       FROM tasks
       WHERE tasks.project_id = $1`,
      [projectId]
    );

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
