import express from "express";
import * as util from "./tasks.controller";

export const tasksRouter = express.Router();

tasksRouter.get("/", util.getTasks);
tasksRouter.post("/create", util.createTask);
tasksRouter.patch("/reorder", util.reorderTask);
