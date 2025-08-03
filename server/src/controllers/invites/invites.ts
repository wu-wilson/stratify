import express from "express";
import * as util from "./invites.controller";

export const invitesRouter = express.Router();
invitesRouter.get("/", util.getInvite);
invitesRouter.get("/create", util.createInvite);
invitesRouter.get("/update/status", util.updateInviteStatus);
