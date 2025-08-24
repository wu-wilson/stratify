import express from "express";
import * as util from "./statuses.controller";

export const statusesRouter = express.Router();

statusesRouter.get("/", util.getStatuses);
