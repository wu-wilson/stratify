import express from "express";
import * as util from "./tags.controller";

export const tagsRouter = express.Router();

tagsRouter.get("/", util.getTags);
tagsRouter.post("/create", util.createTag);
tagsRouter.delete("/delete/:tag_id", util.deleteTag);
