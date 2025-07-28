import { json as bodyParser } from "body-parser";
import { Pool } from "pg";
import { projectsRouter } from "./controllers/projects/projects";
import { membersRouter } from "./controllers/members/members";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser());

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  max: 20,
});

const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("database connected...");
    client.release();
  } catch (err) {
    console.error("error acquiring client", err);
    process.exit(1);
  }
};

testDbConnection();

app.use("/projects", projectsRouter);
app.use("/members", membersRouter);

const options = {
  key: fs.readFileSync(path.join(__dirname, "../../certs/localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../../certs/localhost.pem")),
};

https.createServer(options, app).listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}...`);
});
