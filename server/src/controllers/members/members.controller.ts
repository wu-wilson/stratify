import { Request, Response } from "express";
import { pool } from "../../index";
import admin from "../../firebase/config";

export const getMembers = async (req: Request, res: Response) => {
  const projectId = req.query.project_id as string;
  if (!projectId) {
    res.status(400).json({ error: "project_id query parameter is required" });
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
  const { member_id, project_id } = req.body;

  if (!member_id || !project_id) {
    res.status(400).json({ error: "member_id and project_id are required" });
    return;
  }

  try {
    const { rows } = await pool.query(
      `DELETE FROM members
       WHERE id = $1 AND project_id = $2
       RETURNING *`,
      [member_id, project_id]
    );

    if (!rows[0]) {
      res.status(404).json({ error: "Member not found in project" });
      return;
    }

    res.json({ message: "Member removed successfully", deleted: rows[0] });
  } catch (error) {
    console.error("Error deleting members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
