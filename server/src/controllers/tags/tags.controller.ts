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

export const createTag = async (req: Request, res: Response) => {
  const { project_id, name, color, created_by } = req.body;

  if (!project_id || !name || !color || !created_by) {
    res
      .status(400)
      .json({ error: "project_id, name, color, and created_by are required" });
    return;
  }

  try {
    const {
      rows: [newTag],
    } = await pool.query(
      `INSERT INTO tags (project_id, name, color, created_by)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [project_id, name, color, created_by]
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

export const deleteTag = async (req: Request, res: Response) => {
  const { tag_id } = req.params;

  if (!tag_id) {
    res.status(400).json({ error: "tag_id is required" });
    return;
  }

  try {
    await pool.query("BEGIN");

    const {
      rows: [deletedTag],
    } = await pool.query(
      `DELETE FROM tags
       WHERE id = $1
       RETURNING *`,
      [tag_id]
    );

    await pool.query("COMMIT");

    res.json({
      message: "Tag deleted successfully",
      deleted: deletedTag,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error deleting tag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
