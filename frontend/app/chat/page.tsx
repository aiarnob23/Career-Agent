'use client';
import { useState, useEffect, useRef } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { Input } from '@/components/input';
import { Avatar, AvatarFallback } from '@/components/avatar';
import { chatService, Message } from '@/services/chatService';
import {
  Send,
  MessageCircle,
  Bot,
  User,
  Lightbulb,
  Target,
  TrendingUp,
  Sparkles,
  Trash2,
  Copy,
  Check,
} from 'lucide-react';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedMessages = chatService.loadMessagesFromStorage();
    
    if (storedMessages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        type: 'ai',
        content: "Hello! I'm your AI Career Assistant powered by advanced machine learning. I'm here to help you with career guidance, interview preparation, and professional development. How can I assist you today?",
        timestamp: new Date(),
        suggestions: [
          "Career path suggestions for me",
          "Prepare for an interview",
          "Career change advice",
          "Skill development tips"
        ]
      };
      setMessages([welcomeMessage]);
    } else {
      setMessages(storedMessages);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Save messages to localStorage 
  useEffect(() => {
    if (messages.length > 1) { 
      chatService.saveMessagesToStorage(messages);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage.trim(),
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setCurrentMessage('');
    setIsTyping(true);
    setError(null);

    try {
      // Send message to AI backend
      const aiResponse = await chatService.sendMessageToAI(userMessage.content, updatedMessages);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        suggestions: chatService.generateSuggestions(userMessage.content)
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setError('Failed to get response. Please try again.');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        timestamp: new Date(),
        suggestions: ['Try asking again', 'Check your connection', 'Contact support']
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentMessage(suggestion);
  };

  const handleQuickPromptClick = (prompt: string) => {
    setCurrentMessage(prompt);
  };

  const clearChatHistory = () => {
    chatService.clearChatHistory();
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Career Assistant. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Career path suggestions for me",
        "Prepare for an interview", 
        "Career change advice",
        "Skill development tips"
      ]
    };
    setMessages([welcomeMessage]);
    setError(null);
  };

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatAIResponse = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((paragraph, index) => {
      if (paragraph.includes('• ') || paragraph.includes('- ') || /^\d+\./.test(paragraph)) {
        const items = paragraph.split(/\n(?=[•\-\d])/);
        return (
          <div key={index} className="space-y-2 mb-4">
            {items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-start space-x-2">
                <span className="text-purple-500 text-sm mt-1">•</span>
                <span className="flex-1">{item.replace(/^[•\-\d\.]\s*/, '')}</span>
              </div>
            ))}
          </div>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-4 last:mb-0 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  const quickPrompts = [
    {
      icon: Target,
      title: "Career Goals",
      description: "Plan your next career move",
      prompt: "I want to transition from marketing to product management",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: MessageCircle,
      title: "Interview Prep",
      description: "Practice and prepare for interviews",
      prompt: "Help me prepare for a product manager interview",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: TrendingUp,
      title: "Skill Development",
      description: "Identify skills to learn and grow",
      prompt: "What skills should I learn to advance in my career?",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20">
      <Header />

      <div className="pt-20">
        {/* Header Section */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Quick Actions Sidebar */}
            <div className="space-y-8">
              <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-xl">
                    <div className="flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-purple-600" />
                      Quick Actions
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearChatHistory}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="Clear chat history"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Get instant help with common career questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-300 group"
                      onClick={() => handleQuickPromptClick(prompt.prompt)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${prompt.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <prompt.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{prompt.title}</div>
                          <div className="text-xs overflow-hidden text-gray-500 dark:text-gray-400 mt-1 w-[100px] whitespace-nowrap text-ellipsis">
                            {prompt.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="h-full flex flex-col shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
                <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                  <CardTitle className="flex items-center text-xl">
                    <MessageCircle className="w-5 h-5 mr-2 text-purple-600" />
                    Career Assistant Chat
                  </CardTitle>
                  <CardDescription>
                    Ask me anything about your career development and professional growth
                  </CardDescription>
                </CardHeader>

                {/* Messages */}
                
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-6">
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                      <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-6`}>
                      <div className={`flex items-start space-x-3 w-full ${message.type === 'user' ? 'flex-row-reverse space-x-reverse max-w-2xl ml-auto' : 'max-w-4xl'}`}>
                      <div ref={messagesEndRef} />
                        <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
                          <AvatarFallback className={message.type === 'user' ? 'bg-gradient-to-br from-purple-600 to-cyan-600 text-white' : 'bg-gradient-to-br from-gray-600 to-gray-700 text-white'}>
                            {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="min-w-0 flex-1">
                          <div className={`group relative rounded-2xl p-4 shadow-sm ${message.type === 'user'
                              ? 'bg-gradient-to-br from-purple-600 to-cyan-600 text-white ml-8'
                              : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mr-8'
                            }`}>
                           
                            {message.type === 'ai' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(message.content, message.id)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
                              >
                                {copiedMessageId === message.id ? (
                                  <Check className="w-3 h-3 text-green-500" />
                                ) : (
                                  <Copy className="w-3 h-3 text-gray-500" />
                                )}
                              </Button>
                            )}

                            <div className="text-sm">
                              {message.type === 'ai' ? (
                                <div className="prose prose-sm max-w-none dark:prose-invert">
                                  {formatAIResponse(message.content)}
                                </div>
                              ) : (
                                <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                              )}
                            </div>
                            
                            <div className={`text-xs mt-3 ${message.type === 'user' ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'}`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>

                          {/* Suggestions */}
                          {message.type === 'ai' && message.suggestions && (
                            <div className="mt-4 mr-8">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick suggestions:</p>
                              <div className="flex flex-wrap gap-2">
                                {message.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="text-xs rounded-full border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 transition-all duration-300 h-7"
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                   
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start mb-6">
                      <div className="flex items-start space-x-3 max-w-4xl">
                        <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
                          <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-700 text-white">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 shadow-sm mr-8">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  
                </CardContent>

                {/* Input */}
                <div className="border-t border-gray-100 dark:border-gray-700 p-6">
                  <div className="flex space-x-4">
                    <Input
                      placeholder="Ask me about your career goals, resume, interviews, or professional development..."
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      className="flex-1 h-12 rounded-xl border-2 focus:border-purple-500 transition-colors"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!currentMessage.trim() || isTyping}
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI-powered responses
                      </span>
                      <span>Available 24/7</span>
                      {isTyping && <span className="text-blue-500">AI is typing...</span>}
                    </div>
                    <span className={currentMessage.length > 450 ? 'text-red-500' : ''}>{currentMessage.length}/500</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}