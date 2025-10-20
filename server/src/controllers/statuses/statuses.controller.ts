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
      `SELECT id, name, position, created_on
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

export const createStatus = async (req: Request, res: Response) => {
  const { project_id, name, position } = req.body;

  if (!project_id || !name || typeof position !== "number") {
    res
      .status(400)
      .json({ error: "project_id, name, and position are required" });
    return;
  }

  try {
    const {
      rows: [newStatus],
    } = await pool.query(
      `INSERT INTO statuses (project_id, name, position)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [project_id, name, position]
    );

    res.status(201).json({
      message: "Status created successfully",
      status: newStatus,
    });
  } catch (error) {
    console.error("Error creating status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateStatusIndex = async (req: Request, res: Response) => {
  const { status_id, old_index, new_index, project_id } = req.body;

  if (
    !status_id ||
    !project_id ||
    typeof old_index !== "number" ||
    typeof new_index !== "number"
  ) {
    res.status(400).json({
      error: "status_id, old_index, new_index, and project_id are required",
    });
    return;
  }

  try {
    await pool.query("BEGIN");

    if (old_index < new_index) {
      await pool.query(
        `UPDATE statuses
         SET position = position - 1
         WHERE project_id = $1 AND position > $2 AND position <= $3`,
        [project_id, old_index, new_index]
      );
    } else if (old_index > new_index) {
      await pool.query(
        `UPDATE statuses
         SET position = position + 1
         WHERE project_id = $1 AND position >= $3 AND position < $2`,
        [project_id, old_index, new_index]
      );
    }

    const {
      rows: [updatedStatus],
    } = await pool.query(
      `UPDATE statuses 
       SET position = $2
       WHERE id = $1
       RETURNING *`,
      [status_id, new_index]
    );

    await pool.query("COMMIT");

    res.json({
      message: "Status index updated successfully",
      updated: updatedStatus,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error reordering statuses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
