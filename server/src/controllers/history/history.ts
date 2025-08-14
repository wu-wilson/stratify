import express from "express";
import * as util from "./history.controller";

export const historyRouter = express.Router();
historyRouter.get("/", util.getHistory);
