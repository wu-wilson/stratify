import { Request, Response } from "express";
import { pool } from "../../index";

export const getProjects = async (req: Request, res: Response) => {
  const ownerId = req.query.owner_id as string;
  if (!ownerId) {
    res.status(400).json({ error: "owner_id query parameter is required" });
    return;
  }

  try {
    const { rows } = await pool.query(
      "SELECT * FROM projects WHERE owner_id = $1 ORDER BY created_on DESC",
      [ownerId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { owner_id, name, description } = req.body;

  if (!owner_id || !name) {
    res.status(400).json({ error: "owner_id and name are required" });
    return;
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO projects (owner_id, name, description)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [owner_id, name, description || null]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
