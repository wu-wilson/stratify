import express from "express";
import * as util from "./invites.controller";

export const invitesRouter = express.Router();
invitesRouter.get("/", util.getInvite);
invitesRouter.post("/create", util.createInvite);
invitesRouter.patch("/update/status", util.updateInviteStatus);
