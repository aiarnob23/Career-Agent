"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const agent_route_1 = require("./app/modules/ai-agent/agent.route");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// cors and middlewares for data
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
// routes
app.use("/api/ai-agent", agent_route_1.agentRoutes);
app.get("/", (req, res) => {
    res.send("Career Instructor Server");
});
exports.default = app;
