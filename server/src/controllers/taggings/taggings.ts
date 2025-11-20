import { verifyToken } from "../../middleware/verifyToken";
import { requireProjectMember } from "../../middleware/requireProjectMember";
import express from "express";
import * as util from "./taggings.controller";

export const taggingsRouter = express.Router();

taggingsRouter.use(verifyToken);

taggingsRouter.get("/", requireProjectMember, util.getTaggings);
