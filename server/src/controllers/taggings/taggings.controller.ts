import { Request, Response } from "express";
import { pool } from "../../index";
import { serializeTaskId } from "../tasks/util";

export const getTaggings = async (req: Request, res: Response) => {
  const projectId = req.query.project_id as string;

  if (!projectId) {
    res.status(400).json({ error: "project_id is required" });
    return;
  }

  try {
    const { rows: taggings } = await pool.query(
      `SELECT taggings.*
       FROM taggings
       JOIN tags ON taggings.tag_id = tags.id
       WHERE tags.project_id = $1`,
      [projectId]
    );

    taggings.forEach((tagging) => {
      tagging.task_id = serializeTaskId(tagging.task_id);
    });

    res.json(taggings);
  } catch (error) {
    console.error("Error fetching taggings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
