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
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({
      error: "QueryExecutionError",
      message: "An error occurred while executing the query.",
    });
  }
});

accountsRouter.post("/register", async (req: Request, res: Response) => {
  const { id, display_name } = req.body;

  if (!id || !display_name) {
    res.status(400).json({
      error: "InvalidRequest",
      message: "Both 'id' and 'display_name' are required.",
    });
    return;
  }

  try {
    const QUERY = `INSERT INTO "Users" (id, display_name) VALUES ($1, $2)`;
    await pool.query(QUERY, [id, display_name]);
    res.status(201).json({
      message: "User registered successfully.",
      user_id: id,
    });
  } catch (err) {
    console.error("Database insert error:", err);
    res.status(500).json({
      error: "QueryExecutionError",
      message: "An error occurred while executing the query.",
    });
  }
});
