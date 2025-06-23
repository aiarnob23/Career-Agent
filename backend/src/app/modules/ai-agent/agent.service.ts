import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.5-flash";
const instructions: string = "Suppose you are an AI agent.You will provide real time data and replies along with Your task is to guide a user in their career path. If a user asks for negative or adult information, or becomes frustrated with your response, please avoid the topic by apologizing politely and telling them your limitations. After collecting data online or generating text, please provide a response in a formal format and fine-tune it when you generate the answer, text, or results. The next part is the text from the user; observe it first and then give an appropriate reply or answer.";

const textGenerate = async (content: string, history: any[] = []) => {
  try {
    console.log("Processing content:", content);
    console.log("Processing history:", history);
    
    let contextHistory = "";
    if (history && history.length > 0) {
      const recentHistory = history.slice(-5);
      
      contextHistory = recentHistory
        .map(entry => {
          if (entry.user) {
            if (entry.ai) {
              return `User: ${entry.user}\nAssistant: ${entry.ai}`;
            } else {
              return `User: ${entry.user}`;
            }
          }
          return "";
        })
        .filter(entry => entry.trim() !== "")
        .join("\n\n");
    }

    let fullContent = instructions;
    
    if (contextHistory) {
      fullContent += `\n\nPrevious conversation context:\n${contextHistory}`;
    }
    
    fullContent += `\n\nCurrent user message: ${content}`;

    console.log("Full content being sent to AI:", fullContent);

    // Check if URL is mentioned
    if (content.includes("http") || content.includes("www")) {
      console.log("Detected URL in the request, initiating URL context search...");
      return await urlContextSearch(content, contextHistory);  
    }

    // Normal text generation
    const response: any = await ai.models.generateContent({
      model: model,
      contents: fullContent,
    });

    console.log("AI Response received:", response.text);
    return response.text;
  } catch (error) {
    console.error("Error generating text: ", error);
    throw new Error("Failed to generate AI response");
  }
};

const googleSearch = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [`Perform a Google search for: ${query}`],
    });

    console.log("Search Response: ", response.text);
    return response.text;
  } catch (error) {
    console.error("Error with Google search: ", error);
    throw new Error("Search failed");
  }
};

// Handle URL context search
const urlContextSearch = async (query: string, contextHistory: string = "") => {
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

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: urlPrompt,
      });

      console.log("URL Context Response: ", response.text);
      return response.text;  
    } else {
      console.error("No valid URL found in the request.");
      return "I couldn't find a valid URL in your message. Please check the URL and try again.";
    }
  } catch (error) {
    console.error("Error with URL context: ", error);
    throw new Error("Failed to process URL content");
  }
};

export const agentServices = {
  textGenerate,
};