import { verifyToken } from "../../middleware/verifyToken";
import { requireProjectMember } from "../../middleware/requireProjectMember";
import express from "express";
import * as util from "./invites.controller";

export const invitesRouter = express.Router();

invitesRouter.use(verifyToken);

invitesRouter.get("/", requireProjectMember, util.getInvite);
invitesRouter.get("/metadata", util.getInviteMetadata);
invitesRouter.post("/create", requireProjectMember, util.createInvite);
invitesRouter.patch(
  "/update/status",
  requireProjectMember,
  util.updateInviteStatus
);
invitesRouter.post("/accept", util.acceptInvite);
