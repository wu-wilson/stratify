import { Request, Response } from "express";
import { pool } from "../../index";

export const getProjects = async (req: Request, res: Response) => {
  const userId = req.query.user_id as string;

  if (!userId) {
    res.status(400).json({ error: "user_id is required" });
    return;
  }

  try {
    await pool.query("BEGIN");

    const { rows: projects } = await pool.query(
      `SELECT p.*
       FROM projects p
       LEFT JOIN members m ON p.id = m.project_id
       WHERE m.id = $1
       ORDER BY m.joined_on DESC`,
      [userId]
    );
    res.json(projects);

    await pool.query("COMMIT");
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { owner_id, name, description } = req.body;

  if (!owner_id || !name) {
    res.status(400).json({ error: "owner_id and name are required" });
    return;
  }

  try {
    await pool.query("BEGIN");

    const {
      rows: [newProject],
    } = await pool.query(
      `INSERT INTO projects (owner_id, name, description)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [owner_id, name, description || null]
    );

    await pool.query(
      `INSERT INTO members (id, project_id, role)
       VALUES ($1, $2, $3)`,
      [owner_id, newProject.id, "owner"]
    );

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });

    await pool.query("COMMIT");
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
