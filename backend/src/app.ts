import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { agentRoutes } from "./app/modules/ai-agent/agent.route";

// Load environment variables
dotenv.config();

const app: Application = express();


// cors and middlewares for data
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// routes
app.use("/api/ai-agent",agentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Career Instructor Server");
});

export default app;