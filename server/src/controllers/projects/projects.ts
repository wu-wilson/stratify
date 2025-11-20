import { verifyToken } from "../../middleware/verifyToken";
import express from "express";
import * as util from "./projects.controller";

export const projectsRouter = express.Router();

projectsRouter.use(verifyToken);

projectsRouter.get("/", util.getProjects);
projectsRouter.post("/create", util.createProject);
