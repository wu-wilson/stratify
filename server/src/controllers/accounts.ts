import express, { Request, Response } from "express";
import { pool } from "..";

export const accountsRouter = express.Router();

accountsRouter.get("/exists/:uid", async (req: Request, res: Response) => {
  const { uid } = req.params;

  if (!uid) {
    res.status(400).json({
      error: "BadRequest",
      message: "User ID (uid) parameter is required.",
    });
    return;
  }

  try {
    const QUERY = `SELECT 1 FROM "Users" WHERE id = $1 LIMIT 1`;
    const result = await pool.query(QUERY, [uid]);
    const exists = (result.rowCount ?? 0) > 0;
    res.status(200).json({ exists });
  } catch (queryErr) {
    console.error("Database query error:", queryErr);
    res.status(500).json({
      error: "QueryExecutionError",
      message: "An error occurred while executing the query.",
    });
  }
});
