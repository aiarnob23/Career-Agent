"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentServices = void 0;
const genai_1 = require("@google/genai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.5-flash";
const instructions = "Suppose you are an AI agent. Your task is to guide a user in their career path. If a user asks for negative or adult information, or becomes frustrated with your response, please avoid the topic by apologizing politely and telling them your limitations. After collecting data online or generating text, please provide a response in a formal format and fine-tune it when you generate the answer, text, or results. The next part is the text from the user; observe it first and then give an appropriate reply or answer.";
// Updated to handle frontend requests with history
const textGenerate = (content_1, ...args_1) => __awaiter(void 0, [content_1, ...args_1], void 0, function* (content, history = []) {
    try {
        console.log("Processing content:", content);
        console.log("Processing history:", history);
        // Build context from history - handle both formats
        let contextHistory = "";
        if (history && history.length > 0) {
            // Keep last 5 conversations for context
            const recentHistory = history.slice(-5);
            contextHistory = recentHistory
                .map(entry => {
                // Handle the ChatHistory format from frontend
                if (entry.user) {
                    if (entry.ai) {
                        return `User: ${entry.user}\nAssistant: ${entry.ai}`;
                    }
                    else {
                        return `User: ${entry.user}`;
                    }
                }
                return "";
            })
                .filter(entry => entry.trim() !== "")
                .join("\n\n");
        }
        // Build the full prompt with context
        let fullContent = instructions;
        if (contextHistory) {
            fullContent += `\n\nPrevious conversation context:\n${contextHistory}`;
        }
        fullContent += `\n\nCurrent user message: ${content}`;
        console.log("Full content being sent to AI:", fullContent);
        // Check if URL is mentioned
        if (content.includes("http") || content.includes("www")) {
            console.log("Detected URL in the request, initiating URL context search...");
            return yield urlContextSearch(content, contextHistory);
        }
        // Normal text generation
        const response = yield ai.models.generateContent({
            model: model,
            contents: fullContent,
        });
        console.log("AI Response received:", response.text);
        return response.text;
    }
    catch (error) {
        console.error("Error generating text: ", error);
        throw new Error("Failed to generate AI response");
    }
});
const googleSearch = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [`Perform a Google search for: ${query}`],
        });
        console.log("Search Response: ", response.text);
        return response.text;
    }
    catch (error) {
        console.error("Error with Google search: ", error);
        throw new Error("Search failed");
    }
});
// Handle URL context search
const urlContextSearch = (query_1, ...args_1) => __awaiter(void 0, [query_1, ...args_1], void 0, function* (query, contextHistory = "") {
    try {
        // Extract URL
        const urlPattern = /https?:\/\/[^\s]+/;
        const urlMatch = query.match(urlPattern);
        if (urlMatch && urlMatch[0]) {
            const url = urlMatch[0];
            console.log("Extracted URL: ", url);
            let urlPrompt = `Please provide a summary and analysis from the content at this URL: ${url}. Focus on career-related insights and advice.`;
            if (contextHistory) {
                urlPrompt = `Previous conversation context:\n${contextHistory}\n\n${urlPrompt}`;
            }
            const response = yield ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: urlPrompt,
            });
            console.log("URL Context Response: ", response.text);
            return response.text;
        }
        else {
            console.error("No valid URL found in the request.");
            return "I couldn't find a valid URL in your message. Please check the URL and try again.";
        }
    }
    catch (error) {
        console.error("Error with URL context: ", error);
        throw new Error("Failed to process URL content");
    }
});
exports.agentServices = {
    textGenerate,
};
