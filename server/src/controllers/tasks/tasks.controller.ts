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

export const reorderTask = async (req: Request, res: Response) => {
  const { old_index, new_index, old_status_id, new_status_id, task_id } =
    req.body;

  if (
    typeof old_index !== "number" ||
    typeof new_index !== "number" ||
    !old_status_id ||
    !new_status_id ||
    !task_id
  ) {
    res.status(400).json({
      error:
        "old_index, new_index, old_status_id, new_status_id, and task_id are required",
    });
    return;
  }

  try {
    await pool.query("BEGIN");

    let updatedTask;

    if (old_status_id === new_status_id) {
      if (old_index < new_index) {
        await pool.query(
          `UPDATE tasks
           SET position = position - 1
           WHERE status_id = $1
           AND position > $2
           AND position <= $3`,
          [old_status_id, old_index, new_index]
        );
      } else if (old_index > new_index) {
        await pool.query(
          `UPDATE tasks
           SET position = position + 1
           WHERE status_id = $1
           AND position >= $3
           AND position < $2`,
          [old_status_id, old_index, new_index]
        );
      }

      const {
        rows: [updated],
      } = await pool.query(
        `UPDATE tasks 
         SET position = $1 
         WHERE id = $2 
         RETURNING *`,
        [new_index, task_id]
      );

      updatedTask = updated;
    } else {
      await pool.query(
        `UPDATE tasks
         SET position = position - 1
         WHERE status_id = $1
         AND position > $2`,
        [old_status_id, old_index]
      );

      await pool.query(
        `UPDATE tasks
         SET position = position + 1
         WHERE status_id = $1
         AND position >= $2`,
        [new_status_id, new_index]
      );

      const {
        rows: [updated],
      } = await pool.query(
        `UPDATE tasks
         SET status_id = $1, position = $2
         WHERE id = $3
         RETURNING *`,
        [new_status_id, new_index, task_id]
      );

      updatedTask = updated;
    }

    await pool.query("COMMIT");

    res.json({
      message: "Task reordered successfully",
      updated: updatedTask,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error reordering tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
