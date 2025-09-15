
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface GeminiChatProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const GeminiChat = ({ isOpen = true, onClose }: GeminiChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm here to help you learn about Taskmason. Ask me anything about our platform, features, or how to get started!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Demo mode - simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const demoResponses = [
        "Thanks for your interest in Taskmason! We're a learning platform where you can take courses, exchange skills, and connect with mentors.",
        "Taskmason offers various courses across different categories like cooking, coding, and art. You can browse our marketplace to find courses that interest you.",
        "As a student, you'll have access to your dashboard where you can track progress, view certificates, and manage your wishlist.",
        "Creators can build and sell courses on our platform. We handle payments and provide analytics to help you succeed.",
        "You can pay for courses using traditional payment methods or cryptocurrency. We support multiple currencies for global accessibility."
      ];
      
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Sorry, I'm having trouble responding right now. Please try again.");
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm experiencing some technical difficulties. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-24 right-4 w-80 h-96 z-[65] bg-slate-900/95 border-slate-700 flex flex-col shadow-2xl backdrop-blur-sm md:bottom-6 md:right-6 md:w-96">
      <div className="p-4 border-b border-slate-700">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-white">Ask about Taskmason</h3>
            <p className="text-sm text-slate-400">Powered by Gemini AI</p>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={onClose}
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'bg-slate-800 text-slate-200'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-200 p-3 rounded-lg flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-700">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything about Taskmason..."
            className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputText.trim() || isLoading}
            size="icon"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GeminiChat;
