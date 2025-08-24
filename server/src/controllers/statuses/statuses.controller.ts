import { Request, Response } from "express";
import { pool } from "../../index";

export const getStatuses = async (req: Request, res: Response) => {
  const projectId = req.query.project_id as string;

  if (!projectId) {
    res.status(400).json({ error: "project_id is required" });
    return;
  }

  try {
    const { rows: statuses } = await pool.query(
      `SELECT *
       FROM statuses
       WHERE statuses.project_id = $1`,
      [projectId]
    );

    res.json(statuses);
  } catch (error) {
    console.error("Error fetching statuses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
