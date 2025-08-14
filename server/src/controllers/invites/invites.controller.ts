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

export const getInviteMetadata = async (req: Request, res: Response) => {
  const token = req.query.token as string;

  if (!token) {
    res.status(400).json({ error: "token is required" });
    return;
  }

  try {
    const {
      rows: [invite],
    } = await pool.query(
      `SELECT i.*
       FROM invites i
       WHERE i.token = $1;`,
      [token]
    );
    if (!invite) {
      res.status(404).json({ error: "No invite associated with the token" });
      return;
    }

    const {
      rows: [project],
    } = await pool.query(
      `SELECT p.*
       FROM invites i
       JOIN projects p ON i.project_id = p.id
       WHERE i.token = $1;`,
      [token]
    );
    if (!project) {
      res.status(404).json({ error: "No project associated with the token" });
      return;
    }

    const { rows: members } = await pool.query(
      `SELECT id FROM members WHERE project_id = $1;`,
      [project.id]
    );
    const metadata = {
      invite,
      project: {
        ...project,
        members: members.map((m) => m.id),
      },
    };

    res.json(metadata);
  } catch (error) {
    console.error("Error fetching invite metadata:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createInvite = async (req: Request, res: Response) => {
  const { project_id, max_uses, created_by, paused } = req.body;

  if (
    !project_id ||
    typeof max_uses !== "number" ||
    !created_by ||
    typeof paused !== "boolean"
  ) {
    res.status(400).json({
      error: "project_id, max_uses, created_by, and paused are required",
    });
    return;
  }

  try {
    await pool.query("BEGIN");

    await pool.query(`DELETE FROM invites WHERE project_id = $1`, [project_id]);

    const token = crypto.randomBytes(16).toString("hex");
    const {
      rows: [invite],
    } = await pool.query(
      `INSERT INTO invites (token, project_id, max_uses, uses, paused)
       VALUES ($1, $2, $3, 0, $4)
       RETURNING *`,
      [token, project_id, max_uses, paused]
    );

    await pool.query(
      `INSERT INTO history (project_id, performed_by, action_type, occurred_at)
       VALUES($1, $2, $3, $4)`,
      [project_id, created_by, "created_invite", invite.created_on]
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
  const { project_id, paused, updated_by } = req.body;

  if (!project_id || typeof paused !== "boolean") {
    res
      .status(400)
      .json({ error: "project_id, paused, and updated_by are required" });
    return;
  }

  try {
    await pool.query("BEGIN");

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

    const action = paused ? "paused_invite" : "unpaused_invite";
    const {
      rows: [historyEntry],
    } = await pool.query(
      `INSERT INTO history (project_id, performed_by, action_type)
       VALUES($1, $2, $3)
       RETURNING *`,
      [project_id, updated_by, action]
    );

    await pool.query("COMMIT");

    updatedInvite.paused = paused;
    res.json({
      message: "Invite status updated successfully",
      updated: updatedInvite,
      updated_on: historyEntry.occurred_at,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error pausing invite:", error);
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

    const {
      rows: [invite],
    } = await pool.query(
      `SELECT * FROM invites
       WHERE token = $1 AND project_id = $2 AND paused = FALSE AND uses < max_uses
       FOR UPDATE`,
      [token, project_id]
    );

    if (!invite) {
      await pool.query("ROLLBACK");
      res.status(400).json({ error: "Invalid invite" });
      return;
    }

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

    await pool.query(
      `INSERT INTO history (project_id, performed_by, action_type, occurred_at)
       VALUES($1, $2, $3, $4)`,
      [project_id, member_id, "joined_project", addedMember.joined_on]
    );

    await pool.query("COMMIT");

    const user = await admin.auth().getUser(member_id);
    addedMember.name = user.displayName;

    res.status(201).json({
      message: "Invite accepted successfully",
      added: addedMember,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error adding member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
