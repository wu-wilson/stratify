import { verifyToken } from "../../middleware/verifyToken";
import { requireProjectMember } from "../../middleware/requireProjectMember";
import { requireProjectOwner } from "../../middleware/requireProjectOwner";
import express from "express";
import * as util from "./statuses.controller";

export const statusesRouter = express.Router();

statusesRouter.use(verifyToken);

statusesRouter.get("/", requireProjectMember, util.getStatuses);
statusesRouter.post("/create", requireProjectMember, util.createStatus);
statusesRouter.delete(
  "/delete/:status_id",
  requireProjectOwner,
  util.deleteStatus
);
statusesRouter.patch("/reorder", requireProjectMember, util.reorderStatus);
