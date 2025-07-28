import express from "express";
import * as util from "./members.controller";

export const membersRouter = express.Router();
membersRouter.get("/", util.getMembers);
