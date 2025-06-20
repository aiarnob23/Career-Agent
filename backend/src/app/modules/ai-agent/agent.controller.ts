import { Request, Response } from "express";
import { agentServices } from "./agent.service";
import sendResponse from "../../utils/sendResponse";

const agentChat = async (req: Request, res: Response) => {
    try {
        const inputText = req?.body?.message;
        const history = req?.body?.history || []; 
        
        console.log("Received message:", inputText);
        console.log("Received history:", history);
        
        if (!inputText) {
            return sendResponse(res, {
                success: false,
                statusCode: 400,
                data: null,
                message: "Message is required"
            });
        }
        
        const result = await agentServices.textGenerate(inputText, history);
        
        sendResponse(res, {
            success: true,
            statusCode: 200,
            data: result,
            message: "Request resolved successfully"
        });
    } catch (error) {
        console.error("Error in agentChat:", error);
        sendResponse(res, {
            success: false,
            statusCode: 500,
            data: null,
            message: "Internal server error"
        });
    }
};

export const agentController = {
    agentChat,
};