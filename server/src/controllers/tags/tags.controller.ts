import { Request, Response } from "express";
import { pool } from "../../index";

export const getTags = async (req: Request, res: Response) => {
  const projectId = req.query.project_id as string;

  if (!projectId) {
    res.status(400).json({ error: "project_id is required" });
    return;
  }

  try {
    const { rows: tags } = await pool.query(
      `SELECT *
       FROM tags
       WHERE tags.project_id = $1`,
      [projectId]
    );

    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
