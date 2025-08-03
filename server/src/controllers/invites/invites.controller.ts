import { Request, Response } from "express";
import { pool } from "../../index";
import crypto from "crypto";

export const getInvite = async (req: Request, res: Response) => {
  const projectId = req.query.project_id as string;
  if (!projectId) {
    res.status(400).json({ error: "project_id is required" });
    return;
  }

  try {
    const {
      rows: [invite],
    } = await pool.query(
      `SELECT *
       FROM invites i
       WHERE i.project_id = $1`,
      [projectId]
    );

    res.json(invite ?? null);
  } catch (error) {
    console.error("Error fetching invite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createInvite = async (req: Request, res: Response) => {
  const { created_by, project_id, max_uses } = req.body;

  if (!project_id || !created_by) {
    res.status(400).json({ error: "project_id and created_by are required" });
    return;
  }

  try {
    await pool.query("BEGIN");

    await pool.query(`DELETE FROM invites WHERE project_id = $1`, [project_id]);

    const token = crypto.randomBytes(16).toString("hex");
    const {
      rows: [invite],
    } = await pool.query(
      `INSERT INTO invites (token, project_id, max_uses, uses, paused, created_on, created_by)
       VALUES ($1, $2, $3, 0, FALSE, NOW(), $4)
       RETURNING *`,
      [token, project_id, max_uses, created_by]
    );

    await pool.query("COMMIT");

    res.status(201).json({
      message: "Invite created successfully",
      invite: invite,
    });
  } catch (error) {
    console.error("Error creating invite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateInviteStatus = async (req: Request, res: Response) => {
  const { project_id, paused } = req.body;

  if (!project_id || !paused) {
    res.status(400).json({ error: "project_id and paused are required" });
    return;
  }

  try {
    const {
      rows: [updatedInvite],
    } = await pool.query(
      `UPDATE invites
       SET paused = $1
       WHERE project_id = $2
       RETURNING *`,
      [paused, project_id]
    );

    if (!updatedInvite) {
      res.status(404).json({ error: "No invite found" });
      return;
    }

    res.json({
      message: "Invite status updated successfully",
      updated: updatedInvite,
    });
  } catch (error) {
    console.error("Error pausing invite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
