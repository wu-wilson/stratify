import { verifyToken } from "../../middleware/verifyToken";
import { requireProjectMember } from "../../middleware/requireProjectMember";
import { requireProjectOwner } from "../../middleware/requireProjectOwner";
import express from "express";
import * as util from "./members.controller";

export const membersRouter = express.Router();

membersRouter.use(verifyToken);

membersRouter.get("/", requireProjectMember, util.getMembers);
membersRouter.delete(
  "/delete/:member_id",
  requireProjectOwner,
  util.deleteMember
);
membersRouter.patch("/update/role", requireProjectOwner, util.updateRole);
