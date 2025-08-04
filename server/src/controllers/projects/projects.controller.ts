import { Request, Response } from "express";
import { pool } from "../../index";

export const getProjects = async (req: Request, res: Response) => {
  const userId = req.query.user_id as string;

  if (!userId) {
    res.status(400).json({ error: "user_id is required" });
    return;
  }

  try {
    const { rows: projects } = await pool.query(
      `SELECT p.*
       FROM projects p
       LEFT JOIN members m ON p.id = m.project_id
       WHERE m.id = $1
       ORDER BY m.joined_on DESC`,
      [userId]
    );
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProjectMetadata = async (req: Request, res: Response) => {
  const token = req.query.token as string;

  if (!token) {
    res.status(400).json({ error: "token is required" });
    return;
  }

  try {
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
      res.status(404).json({ error: "Invalid or expired invite token" });
      return;
    }

    project.members = [];
    const { rows: members } = await pool.query(
      `SELECT id FROM members WHERE project_id = $1;`,
      [project.id]
    );
    project.members = members.map((m) => m.id);

    res.json(project);
  } catch (error) {
    console.error("Error fetching project metadata:", error);
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
    await pool.query("ROLLBACK");
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
