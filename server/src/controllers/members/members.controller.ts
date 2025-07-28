import { Request, Response } from "express";
import { pool } from "../../index";

export const getMembers = async (req: Request, res: Response) => {
  const projectId = req.query.project_id as string;
  if (!projectId) {
    res.status(400).json({ error: "project_id query parameter is required" });
    return;
  }

  try {
    const { rows } = await pool.query(
      `SELECT m.id, m.role, m.joined_on
       FROM members m
       WHERE m.project_id = $1
       ORDER BY m.joined_on DESC`,
      [projectId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
