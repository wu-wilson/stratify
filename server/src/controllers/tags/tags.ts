import express from "express";
import * as util from "./tags.controller";

export const tagsRouter = express.Router();

tagsRouter.get("/", util.getTags);
