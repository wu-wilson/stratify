import { verifyToken } from "../../middleware/verifyToken";
import { requireProjectMember } from "../../middleware/requireProjectMember";
import express from "express";
import * as util from "./history.controller";

export const historyRouter = express.Router();

historyRouter.use(verifyToken, requireProjectMember);

historyRouter.get("/", util.getHistory);
