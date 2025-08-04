import { Request, Response } from "express";
import { pool } from "../../index";
import crypto from "crypto";
import admin from "../../firebase/config";

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

export const acceptInvite = async (req: Request, res: Response) => {
  const { member_id, project_id, token } = req.body;

  if (!member_id || !project_id || !token) {
    res.status(400).json({ error: "id, project_id, and token are required" });
    return;
  }

  try {
    await pool.query("BEGIN");

    await pool.query(
      `UPDATE invites
       SET uses = uses + 1
       WHERE token = $1`,
      [token]
    );

    const {
      rows: [addedMember],
    } = await pool.query(
      `INSERT INTO members (id, project_id, role)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [member_id, project_id, "member"]
    );

    const user = await admin.auth().getUser(member_id);
    addedMember.name = user.displayName;

    res.status(201).json({
      message: "Invite accepted successfully",
      added: addedMember,
    });

    await pool.query("COMMIT");
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error adding member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createInvite = async (req: Request, res: Response) => {
  const { project_id, max_uses } = req.body;

  if (!project_id) {
    res.status(400).json({ error: "project_id is required" });
    return;
  }

  try {
    await pool.query("BEGIN");

    await pool.query(`DELETE FROM invites WHERE project_id = $1`, [project_id]);

    const token = crypto.randomBytes(16).toString("hex");
    const {
      rows: [invite],
    } = await pool.query(
      `INSERT INTO invites (token, project_id, max_uses, uses, paused, created_on)
       VALUES ($1, $2, $3, 0, FALSE, NOW())
       RETURNING *`,
      [token, project_id, max_uses]
    );

    await pool.query("COMMIT");

    res.status(201).json({
      message: "Invite created successfully",
      invite: invite,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error creating invite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateInviteStatus = async (req: Request, res: Response) => {
  const { project_id, paused } = req.body;

  if (!project_id || typeof paused !== "boolean") {
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

    updatedInvite.paused = paused;
    res.json({
      message: "Invite status updated successfully",
      updated: updatedInvite,
    });
  } catch (error) {
    console.error("Error pausing invite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
