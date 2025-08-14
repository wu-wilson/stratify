import { Request, Response } from "express";
import { pool } from "../../index";
import admin from "../../firebase/config";

export const getHistory = async (req: Request, res: Response) => {
  const projectId = req.query.project_id as string;

  if (!projectId) {
    res.status(400).json({ error: "project_id is required" });
    return;
  }

  try {
    const { rows: history } = await pool.query(
      `SELECT performed_by, action_type, performed_on, occurred_at
       FROM history h
       WHERE h.project_id = $1
       ORDER BY h.occurred_at DESC`,
      [projectId]
    );

    const uids: { uid: string }[] = Array.from(
      new Set(
        history.flatMap((h) => [h.performed_by, h.performed_on].filter(Boolean))
      ),
      (uid) => ({ uid })
    );
    const { users } = await admin.auth().getUsers(uids);

    const userMetadataMap = new Map(users.map((user) => [user.uid, user]));

    const enrichedHistory = history.map((h) => ({
      ...h,
      performed_by: userMetadataMap.get(h.performed_by)!.displayName,
      performed_on: h.performed_on
        ? userMetadataMap.get(h.performed_on)!.displayName
        : null,
    }));

    res.json(enrichedHistory);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
