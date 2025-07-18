"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const agent_controller_1 = require("./agent.controller");
const router = express_1.default.Router();
router.post("/chat", agent_controller_1.agentController.agentChat);
exports.agentRoutes = router;
