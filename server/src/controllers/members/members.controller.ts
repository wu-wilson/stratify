import { Request, Response } from "express";
import { pool } from "../../index";
import admin from "../../firebase/config";

export const getMembers = async (req: Request, res: Response) => {
  const projectId = req.query.project_id as string;

  if (!projectId) {
    res.status(400).json({ error: "project_id is required" });
    return;
  }

  try {
    const { rows: members } = await pool.query(
      `SELECT m.id, m.role, m.joined_on
       FROM members m
       WHERE m.project_id = $1
       ORDER BY m.joined_on DESC`,
      [projectId]
    );

    const uids = members.map((member) => ({ uid: member.id }));
    const { users } = await admin.auth().getUsers(uids);

    const userMetadataMap = new Map(users.map((user) => [user.uid, user]));

    const enrichedMembers = members.map((member) => ({
      ...member,
      name: userMetadataMap.get(member.id)?.displayName ?? "Unknown",
    }));

    res.json(enrichedMembers);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  const { member_id, project_id, deleted_by } = req.body;

  if (!member_id || !project_id) {
    res
      .status(400)
      .json({ error: "member_id, project_id, and deleted_by are required" });
    return;
  }

  try {
    await pool.query("BEGIN");

    const {
      rows: [deletedMember],
    } = await pool.query(
      `DELETE FROM members
       WHERE id = $1 AND project_id = $2
       RETURNING *`,
      [member_id, project_id]
    );

    if (!deletedMember) {
      res.status(404).json({ error: "Member not found in project" });
      return;
    }

    const {
      rows: [historyEntry],
    } = await pool.query(
      `INSERT INTO history (project_id, performed_by, action_type, performed_on)
       VALUES($1, $2, $3, $4)
       RETURNING *`,
      [project_id, deleted_by, "removed_from_project", member_id]
    );

    await pool.query("COMMIT");

    res.json({
      message: "Member removed successfully",
      deleted: deletedMember,
      deleted_on: historyEntry.occurred_at,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error deleting members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  const { member_id, project_id, role, updated_by } = req.body;

  if (!member_id || !project_id || !role) {
    res.status(400).json({
      error: "member_id, project_id, role, and updated_by are required",
    });
    return;
  }

  try {
    await pool.query("BEGIN");

    const {
      rows: [updatedMember],
    } = await pool.query(
      `UPDATE members
       SET role = $3
       WHERE id = $1 AND project_id = $2
       RETURNING *`,
      [member_id, project_id, role]
    );

    if (!updatedMember) {
      res.status(404).json({ error: "Member not found in project" });
      return;
    }

    const {
      rows: [historyEntry],
    } = await pool.query(
      `INSERT INTO history (project_id, performed_by, action_type, performed_on)
       VALUES($1, $2, $3, $4)
       RETURNING *`,
      [project_id, updated_by, "promoted_to_owner", member_id]
    );

    await pool.query("COMMIT");

    updatedMember.role = role;
    res.json({
      message: "Role updated successfully",
      updated: updatedMember,
      updated_on: historyEntry.occurred_at,
    });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
