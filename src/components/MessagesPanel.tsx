import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send,
  Bot,
  User,
  AlertCircle,
  CheckCircle,
  MessageSquare
} from "lucide-react";
import { format } from "date-fns";

// Mock message data
const mockMessages = [
  {
    id: "1",
    channel: "SYSTEM" as const,
    from: "SYSTEM" as const,
    body: "Welcome to SkillSync! Your learning journey begins now. Complete your first task to earn 50 XP.",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true
  },
  {
    id: "2",
    channel: "MENTOR_CHAT" as const,
    from: "AI_MENTOR" as const,
    body: "Great job on completing the React setup task! I noticed you're working on the component architecture. Would you like some tips on best practices for component composition?",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isRead: false
  },
  {
    id: "3",
    channel: "REVIEW" as const,
    from: "AI_MENTOR" as const,
    body: "Your code review for the Todo App project is complete. I've found 2 suggestions for improvement and 3 areas where you've done excellent work!",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false
  },
  {
    id: "4",
    channel: "MENTOR_CHAT" as const,
    from: "STUDENT" as const,
    body: "How can I improve my state management in React? I'm struggling with complex component trees.",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    isRead: true
  },
  {
    id: "5",
    channel: "MENTOR_CHAT" as const,
    from: "AI_MENTOR" as const,
    body: "Excellent question! For complex state management, I recommend starting with React Context for simple shared state, and considering Redux Toolkit or Zustand for more complex scenarios. Let me share some specific patterns...",
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    isRead: false
  }
];

const getMessageIcon = (from: string, channel: string) => {
  if (from === "AI_MENTOR") return <Bot className="h-4 w-4" />;
  if (from === "STUDENT") return <User className="h-4 w-4" />;
  if (channel === "SYSTEM") return <AlertCircle className="h-4 w-4" />;
  if (channel === "REVIEW") return <CheckCircle className="h-4 w-4" />;
  return <MessageSquare className="h-4 w-4" />;
};

const getMessageBadgeVariant = (channel: string) => {
  switch (channel) {
    case "SYSTEM": return "destructive";
    case "REVIEW": return "secondary";
    default: return "outline";
  }
};

export const MessagesPanel = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const studentMessage = {
      id: Date.now().toString(),
      channel: "MENTOR_CHAT" as const,
      from: "STUDENT" as const,
      body: newMessage,
      createdAt: new Date(),
      isRead: true
    };

    // Simulate AI response after a short delay
    const aiResponse = {
      id: (Date.now() + 1).toString(),
      channel: "MENTOR_CHAT" as const,
      from: "AI_MENTOR" as const,
      body: `Thanks for your question! I understand you're asking about "${newMessage.slice(0, 50)}...". Let me help you with that. This is a common challenge many students face, and I have some great suggestions to help you improve.`,
      createdAt: new Date(Date.now() + 2000),
      isRead: false
    };

    setMessages(prev => [...prev, studentMessage]);
    setNewMessage("");

    // Add AI response after delay
    setTimeout(() => {
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Messages</h2>
            <p className="text-muted-foreground">Chat with your AI mentor and view system notifications</p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={message.id}>
              <Card className={`glass hover-lift transition-all duration-300 ${!message.isRead ? 'ring-2 ring-primary/30' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={message.from === 'AI_MENTOR' ? 'gradient-primary text-primary-foreground' : 'bg-secondary'}>
                          {getMessageIcon(message.from, message.channel)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm">
                            {message.from === 'AI_MENTOR' ? 'AI Mentor' : 
                             message.from === 'STUDENT' ? 'You' : 'System'}
                          </span>
                          <Badge variant={getMessageBadgeVariant(message.channel)} className="text-xs">
                            {message.channel.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {format(message.createdAt, 'MMM d, h:mm a')}
                        </p>
                      </div>
                    </div>
                    {!message.isRead && (
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{message.body}</p>
                </CardContent>
              </Card>
              {index < messages.length - 1 && <Separator className="my-4 opacity-30" />}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-6 border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="space-y-3">
          <label className="text-sm font-medium">Send a message to your AI Mentor</label>
          <div className="flex space-x-3">
            <Textarea
              placeholder="Ask a question, request help, or share your progress..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="min-h-[60px] resize-none glass"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="gradient-primary px-6"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};