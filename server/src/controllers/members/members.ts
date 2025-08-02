import express from "express";
import * as util from "./members.controller";

export const membersRouter = express.Router();
membersRouter.get("/", util.getMembers);
membersRouter.delete("/delete", util.deleteMember);
membersRouter.patch("/update/role", util.updateRole);
