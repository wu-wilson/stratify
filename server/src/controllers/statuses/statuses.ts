import express from "express";
import * as util from "./statuses.controller";

export const statusesRouter = express.Router();

statusesRouter.get("/", util.getStatuses);
statusesRouter.post("/create", util.createStatus);
statusesRouter.delete("/delete/:status_id", util.deleteStatus);
statusesRouter.patch("/reorder", util.reorderStatus);
