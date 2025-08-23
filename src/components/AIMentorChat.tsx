import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Send,
  Bot,
  User,
  Lightbulb,
  Code,
  BookOpen,
  Minimize2,
  Maximize2
} from "lucide-react";
import { format } from "date-fns";
import { AI_MENTOR_RESPONSES } from "@/lib/mockData";

interface ChatMessage {
  id: string;
  from: 'AI_MENTOR' | 'STUDENT';
  message: string;
  timestamp: Date;
  type?: 'tip' | 'code' | 'explanation' | 'question';
}

interface AIMentorChatProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  className?: string;
}

export const AIMentorChat = ({ isMinimized = false, onToggleMinimize, className = "" }: AIMentorChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      from: "AI_MENTOR",
      message: "Hi! I'm your AI Mentor. I'm here to help you with coding questions, provide feedback, and guide you through your learning journey. What would you like to work on today?",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: "explanation"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIMentorResponse = (userMessage: string): { message: string; tips?: string[]; codeSnippet?: string; nextSteps?: string[]; type: 'tip' | 'code' | 'explanation' | 'question' } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find relevant response based on keywords
    const relevantResponse = AI_MENTOR_RESPONSES.find(response => 
      response.trigger.some(keyword => lowerMessage.includes(keyword))
    );

    if (relevantResponse) {
      return {
        message: relevantResponse.response.message,
        tips: relevantResponse.response.tips,
        codeSnippet: relevantResponse.response.codeSnippet,
        nextSteps: relevantResponse.response.nextSteps,
        type: relevantResponse.response.codeSnippet ? 'code' : 'explanation'
      };
    }

    // Default responses for common patterns
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return {
        message: "I'd be happy to help! Can you be more specific about what you're working on? For example, are you dealing with a particular technology, debugging an issue, or trying to understand a concept?",
        type: 'question'
      };
    }

    if (lowerMessage.includes('error') || lowerMessage.includes('bug')) {
      return {
        message: "Debugging can be challenging! Here's my systematic approach: 1) Read the error message carefully, 2) Check the line number mentioned, 3) Look for typos or syntax issues, 4) Use console.log to trace the data flow. What specific error are you encountering?",
        tips: [
          "Always read error messages completely",
          "Use browser dev tools for debugging",
          "Console.log is your friend for tracking variables",
          "Check for typos in variable names and function calls"
        ],
        type: 'tip'
      };
    }

    // Generic helpful response
    return {
      message: `That's a great question about "${userMessage.slice(0, 50)}${userMessage.length > 50 ? '...' : ''}". I'd love to help you dive deeper into this topic. Could you share more context about what specifically you'd like to understand or achieve?`,
      type: 'explanation'
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      from: "STUDENT",
      message: inputMessage,
      timestamp: new Date(),
      type: "question"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const aiResponse = getAIMentorResponse(inputMessage);
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      from: "AI_MENTOR",
      message: aiResponse.message,
      timestamp: new Date(),
      type: aiResponse.type
    };

    setMessages(prev => [...prev, aiMessage]);
    
    // Add additional content if available
    if (aiResponse.tips && aiResponse.tips.length > 0) {
      setTimeout(async () => {
        const tipsMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          from: "AI_MENTOR",
          message: "Here are some helpful tips:\n\n" + aiResponse.tips!.map((tip, i) => `${i + 1}. ${tip}`).join('\n'),
          timestamp: new Date(),
          type: "tip"
        };
        setMessages(prev => [...prev, tipsMessage]);
      }, 1000);
    }

    if (aiResponse.codeSnippet) {
      setTimeout(async () => {
        const codeMessage: ChatMessage = {
          id: (Date.now() + 3).toString(),
          from: "AI_MENTOR",
          message: `Here's a code example:\n\n\`\`\`\n${aiResponse.codeSnippet}\n\`\`\``,
          timestamp: new Date(),
          type: "code"
        };
        setMessages(prev => [...prev, codeMessage]);
      }, 2000);
    }

    setIsTyping(false);
  };

  const getMessageTypeIcon = (type?: string) => {
    switch (type) {
      case 'tip': return <Lightbulb className="h-3 w-3" />;
      case 'code': return <Code className="h-3 w-3" />;
      case 'explanation': return <BookOpen className="h-3 w-3" />;
      default: return null;
    }
  };

  const formatMessage = (message: string) => {
    // Simple markdown-like formatting for code blocks
    if (message.includes('```')) {
      const parts = message.split('```');
      return parts.map((part, index) => (
        <span key={index}>
          {index % 2 === 1 ? (
            <pre className="bg-muted/50 p-3 rounded-lg mt-2 mb-2 text-sm overflow-x-auto">
              <code>{part}</code>
            </pre>
          ) : (
            <span className="whitespace-pre-wrap">{part}</span>
          )}
        </span>
      ));
    }
    return <span className="whitespace-pre-wrap">{message}</span>;
  };

  if (isMinimized) {
    return (
      <Card className={`glass hover-lift cursor-pointer ${className}`} onClick={onToggleMinimize}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="gradient-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">AI Mentor</p>
                <p className="text-xs text-muted-foreground">Click to open chat</p>
              </div>
            </div>
            <Badge variant="secondary" className="animate-pulse">
              {messages.length} messages
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`glass ${className}`}>
      <div className="p-4 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="gradient-primary text-primary-foreground">
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">AI Mentor</h3>
              <p className="text-xs text-muted-foreground">Always here to help you learn</p>
            </div>
          </div>
          {onToggleMinimize && (
            <Button variant="ghost" size="sm" onClick={onToggleMinimize}>
              <Minimize2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.from === 'STUDENT' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${message.from === 'STUDENT' ? 'order-1' : ''}`}>
                <div className={`flex items-start space-x-2 ${message.from === 'STUDENT' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={message.from === 'AI_MENTOR' ? 'gradient-primary text-primary-foreground' : 'bg-secondary'}>
                      {message.from === 'AI_MENTOR' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`rounded-lg p-3 ${
                    message.from === 'STUDENT' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted/50'
                  }`}>
                    {message.type && message.from === 'AI_MENTOR' && (
                      <div className="flex items-center space-x-1 mb-2 opacity-80">
                        {getMessageTypeIcon(message.type)}
                        <span className="text-xs uppercase tracking-wide">
                          {message.type}
                        </span>
                      </div>
                    )}
                    <div className="text-sm leading-relaxed">
                      {formatMessage(message.message)}
                    </div>
                    <p className="text-xs opacity-60 mt-2">
                      {format(message.timestamp, 'h:mm a')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="gradient-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-muted/50">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border/40">
        <div className="flex space-x-3">
          <Textarea
            placeholder="Ask me anything about coding, get help with projects, or request explanations..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="min-h-[60px] resize-none glass"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="gradient-primary"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </Card>
  );
};