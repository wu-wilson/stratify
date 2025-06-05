import express from "express";
import * as util from "./project.controller";

export const projectRouter = express.Router();

projectRouter.get("/", util.getProjects);
projectRouter.post("/create", util.createProject);
