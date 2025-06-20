import express from "express";
import { agentController } from "./agent.controller";
const router = express.Router();

router.post("/chat", agentController.agentChat);

export const agentRoutes = router;

