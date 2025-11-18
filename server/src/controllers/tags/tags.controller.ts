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
      `SELECT id, name, color, created_on
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

export const createTag = async (req: Request, res: Response) => {
  const { project_id, name, color } = req.body;

  if (!project_id || !name || !color) {
    res.status(400).json({ error: "project_id, name, and color are required" });
    return;
  }

  try {
    const {
      rows: [newTag],
    } = await pool.query(
      `INSERT INTO tags (project_id, name, color)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [project_id, name, color]
    );

    res.status(201).json({
      message: "Tag created successfully",
      tag: newTag,
    });
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
