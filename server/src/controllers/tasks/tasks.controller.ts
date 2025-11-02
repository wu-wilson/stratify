import { Request, Response } from "express";
import { pool } from "../../index";
import { deserializeTaskId, serializeTaskId } from "./util";
import { deserializeStatusId, serializeStatusId } from "../statuses/util";

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

    tasks.forEach((task) => {
      task.id = serializeTaskId(task.id);
      task.status_id = serializeStatusId(task.status_id);
    });

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const {
    project_id,
    status_id,
    created_by,
    assigned_to,
    title,
    description,
    position,
  } = req.body;

  if (
    !project_id ||
    !status_id ||
    !created_by ||
    !title ||
    typeof position !== "number"
  ) {
    res.status(400).json({
      error:
        "project_id, status_id, created_by, title, and position are required",
    });
    return;
  }

  try {
    const deserializedStatusId = deserializeStatusId(status_id);

    const {
      rows: [newTask],
    } = await pool.query(
      `INSERT INTO tasks (project_id, status_id, created_by, assigned_to, title, description, position)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        project_id,
        deserializedStatusId,
        created_by,
        assigned_to,
        title,
        description,
        position,
      ]
    );

    newTask.id = serializeTaskId(newTask.id);
    newTask.status_id = serializeStatusId(newTask.status_id);

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { task_id, status_id, index } = req.body;

  if (!task_id || !status_id || typeof index !== "number") {
    res.status(400).json({ error: "task_id and index are required" });
    return;
  }

  try {
    await pool.query("BEGIN");

    const deserializedStatusId = deserializeStatusId(status_id);

    await pool.query(
      `UPDATE tasks
       SET position = position - 1
       WHERE position > $1 AND status_id = $2`,
      [index, deserializedStatusId]
    );

    const deserializedTaskId = deserializeTaskId(task_id);

    const {
      rows: [deletedTask],
    } = await pool.query(
      `DELETE FROM tasks
       WHERE id = $1
       RETURNING *`,
      [deserializedTaskId]
    );

    await pool.query("COMMIT");

    deletedTask.id = serializeTaskId(deletedTask.id);
    deletedTask.status_id = serializeStatusId(deletedTask.status_id);

    res.json({
      message: "Task deleted successfully",
      deleted: deletedTask,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error deleting task:", error);
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

    const deserializedOldStatusId = deserializeStatusId(old_status_id);
    const deserializedNewStatusId = deserializeStatusId(new_status_id);
    const deserializedTaskId = deserializeTaskId(task_id);

    if (old_status_id === new_status_id) {
      if (old_index < new_index) {
        await pool.query(
          `UPDATE tasks
           SET position = position - 1
           WHERE status_id = $1
           AND position > $2
           AND position <= $3`,
          [deserializedOldStatusId, old_index, new_index]
        );
      } else if (old_index > new_index) {
        await pool.query(
          `UPDATE tasks
           SET position = position + 1
           WHERE status_id = $1
           AND position >= $3
           AND position < $2`,
          [deserializedOldStatusId, old_index, new_index]
        );
      }

      const {
        rows: [updated],
      } = await pool.query(
        `UPDATE tasks 
         SET position = $1 
         WHERE id = $2 
         RETURNING *`,
        [new_index, deserializedTaskId]
      );

      updatedTask = updated;
    } else {
      await pool.query(
        `UPDATE tasks
         SET position = position - 1
         WHERE status_id = $1
         AND position > $2`,
        [deserializedOldStatusId, old_index]
      );

      await pool.query(
        `UPDATE tasks
         SET position = position + 1
         WHERE status_id = $1
         AND position >= $2`,
        [deserializedNewStatusId, new_index]
      );

      const {
        rows: [updated],
      } = await pool.query(
        `UPDATE tasks
         SET status_id = $1, position = $2
         WHERE id = $3
         RETURNING *`,
        [deserializedNewStatusId, new_index, deserializedTaskId]
      );

      updatedTask = updated;
    }

    await pool.query("COMMIT");

    updatedTask.id = serializeTaskId(updatedTask.id);
    updatedTask.status_id = serializeStatusId(updatedTask.status_id);

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
