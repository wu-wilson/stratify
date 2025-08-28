import express from "express";
import * as util from "./taggings.controller";

export const taggingsRouter = express.Router();

taggingsRouter.get("/", util.getTaggings);
