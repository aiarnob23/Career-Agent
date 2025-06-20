interface Message {
    id: string;
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
    suggestions?: string[];
}

interface ChatHistory {
    user: string;
    ai?: string;
}

class ChatService {
    private readonly STORAGE_KEY = 'chat_history';
    private readonly API_URL = 'career-agent-backend.vercel.app/api/ai-agent/chat';
    private readonly MAX_HISTORY = 5;

    // Save messages to localStorage
    saveMessagesToStorage(messages: Message[]): void {
        try {
            console.log("Saving messages to storage:", messages);
            
            // Convert messages to chat history format
            const chatHistory: ChatHistory[] = [];
            
            // Process messages in pairs (user-ai)
            for (let i = 0; i < messages.length; i++) {
                const message = messages[i];
                
                if (message.type === 'user') {
                    // Look for the next AI message
                    const nextMessage = messages[i + 1];
                    
                    chatHistory.push({
                        user: message.content,
                        ai: nextMessage && nextMessage.type === 'ai' ? nextMessage.content : undefined
                    });
                    
                    // Skip the AI message in the next iteration if it exists
                    if (nextMessage && nextMessage.type === 'ai') {
                        i++; // Skip the AI message as we've already processed it
                    }
                }
            }
            
            // Keep only the most recent conversations
            const recentHistory = chatHistory.slice(-this.MAX_HISTORY);
            
            console.log("Chat history to save:", recentHistory);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recentHistory));
        } catch (error) {
            console.error('Error saving messages to storage:', error);
        }
    }

    // Load messages from localStorage
    loadMessagesFromStorage(): Message[] {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (!stored) {
                console.log("No stored messages found");
                return [];
            }

            const chatHistory: ChatHistory[] = JSON.parse(stored);
            console.log("Loaded chat history:", chatHistory);
            
            const messages: Message[] = [];

            chatHistory.forEach((chat, index) => {
                // Add user message
                messages.push({
                    id: `stored_user_${index}_${Date.now()}`,
                    type: 'user',
                    content: chat.user,
                    timestamp: new Date(Date.now() - (chatHistory.length - index) * 60000) // Stagger timestamps
                });

                // Add AI message if exists
                if (chat.ai) {
                    messages.push({
                        id: `stored_ai_${index}_${Date.now()}`,
                        type: 'ai',
                        content: chat.ai,
                        timestamp: new Date(Date.now() - (chatHistory.length - index) * 60000 + 1000)
                    });
                }
            });

            console.log("Loaded messages:", messages);
            return messages;
        } catch (error) {
            console.error('Error loading messages from storage:', error);
            return [];
        }
    }

    // Get chat history in backend format
    getChatHistoryForBackend(): ChatHistory[] {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            const history = stored ? JSON.parse(stored) : [];
            console.log("Chat history for backend:", history);
            return history;
        } catch (error) {
            console.error('Error getting chat history for backend:', error);
            return [];
        }
    }

    // Send message to AI backend
    async sendMessageToAI(userMessage: string, currentMessages: Message[]): Promise<string> {
        try {
            console.log("Sending message to AI:", userMessage);
            console.log("Current messages:", currentMessages);
            
            // Create a temporary array with the new user message for context
            const messagesWithNewMessage = [...currentMessages];
            
            // Get chat history for context (don't include the current message yet)
            const chatHistory = this.getChatHistoryForBackend();
            
            console.log("Sending to backend - Message:", userMessage);
            console.log("Sending to backend - History:", chatHistory);

            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: chatHistory
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Backend response:", data);
            
            const aiResponse = data.data || 'Sorry, I could not process your request.';
            
            // Now save the messages including the new conversation
            const newUserMessage: Message = {
                id: Date.now().toString(),
                type: 'user',
                content: userMessage,
                timestamp: new Date()
            };
            
            const newAiMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: aiResponse,
                timestamp: new Date()
            };
            
            // Save the updated conversation
            const updatedMessages = [...currentMessages, newUserMessage, newAiMessage];
            this.saveMessagesToStorage(updatedMessages);
            
            return aiResponse;
        } catch (error) {
            console.error('Error sending message to AI:', error);
            throw new Error('Failed to get AI response. Please try again.');
        }
    }

    // Clear chat history
    clearChatHistory(): void {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            console.log("Chat history cleared");
        } catch (error) {
            console.error('Error clearing chat history:', error);
        }
    }

    // Generate suggestions based on user input
    generateSuggestions(userInput: string): string[] {
        const suggestions = {
            resume: [
                "How to optimize my resume for ATS?",
                "What format is best for my resume?",
                "How to highlight achievements?",
                "Resume tips for career changers"
            ],
            interview: [
                "Common behavioral interview questions",
                "How to prepare for technical interviews?",
                "What questions should I ask interviewer?",
                "Tips for virtual interviews"
            ],
            career: [
                "How to plan a career transition?",
                "Skills needed for my target role",
                "Industry trends to watch",
                "How to build professional network?"
            ],
            salary: [
                "How to negotiate salary effectively?",
                "Research salary ranges for my role",
                "When to discuss compensation?",
                "Benefits vs salary trade-offs"
            ],
            skills: [
                "In-demand skills for my industry",
                "How to learn new skills quickly?",
                "Certifications worth pursuing",
                "How to showcase soft skills?"
            ]
        };

        const lowerInput = userInput.toLowerCase();
        
        if (lowerInput.includes('resume') || lowerInput.includes('cv')) {
            return suggestions.resume;
        }
        if (lowerInput.includes('interview')) {
            return suggestions.interview;
        }
        if (lowerInput.includes('career') || lowerInput.includes('job')) {
            return suggestions.career;
        }
        if (lowerInput.includes('salary') || lowerInput.includes('pay')) {
            return suggestions.salary;
        }
        if (lowerInput.includes('skill')) {
            return suggestions.skills;
        }

        // Default suggestions
        return [
            "Tell me about career opportunities",
            "Help with interview preparation",
            "Resume optimization tips",
            "Skill development advice"
        ];
    }
}

// Export singleton instance
export const chatService = new ChatService();

// Export types
export type { Message, ChatHistory };