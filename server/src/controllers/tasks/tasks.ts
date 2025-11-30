import { verifyToken } from "../../middleware/verifyToken";
import { requireProjectMember } from "../../middleware/requireProjectMember";
import { requireProjectOwner } from "../../middleware/requireProjectOwner";
import express from "express";
import * as util from "./tasks.controller";

export const tasksRouter = express.Router();

tasksRouter.use(verifyToken);

tasksRouter.get("/", requireProjectMember, util.getTasks);
tasksRouter.post("/create", requireProjectMember, util.createTask);
tasksRouter.delete("/delete/:task_id", requireProjectOwner, util.deleteTask);
tasksRouter.patch("/reorder", requireProjectMember, util.reorderTask);
tasksRouter.patch("/edit", requireProjectMember, util.editTask);
