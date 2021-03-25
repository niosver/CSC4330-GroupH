import express from "express";
import { Report, DockReport } from "./report.interface";
import { gen } from "./reportGen";
const router = express.Router();