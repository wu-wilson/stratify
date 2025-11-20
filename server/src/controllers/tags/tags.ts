import { verifyToken } from "../../middleware/verifyToken";
import { requireProjectMember } from "../../middleware/requireProjectMember";
import { requireProjectOwner } from "../../middleware/requireProjectOwner";
import express from "express";
import * as util from "./tags.controller";

export const tagsRouter = express.Router();

tagsRouter.use(verifyToken);

tagsRouter.get("/", requireProjectMember, util.getTags);
tagsRouter.post("/create", requireProjectMember, util.createTag);
tagsRouter.delete("/delete/:tag_id", requireProjectOwner, util.deleteTag);
tagsRouter.patch("/update", requireProjectMember, util.updateTag);
