import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft, 
  Play, 
  MessageSquare, 
  FileCode, 
  Upload,
  MoreHorizontal,
  Plus,
  Brain
} from "lucide-react";
import { SAMPLE_TASKS } from "@/lib/mockData";
import { TaskStatus } from "@/lib/types";

interface WorkspacePreviewProps {
  projectId: string;
  onBack: () => void;
}

const WorkspacePreview = ({ projectId, onBack }: WorkspacePreviewProps) => {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  
  const columns: { status: TaskStatus; title: string; color: string }[] = [
    { status: 'BACKLOG', title: 'Backlog', color: 'bg-muted' },
    { status: 'IN_PROGRESS', title: 'In Progress', color: 'bg-warning' },
    { status: 'REVIEW', title: 'Review', color: 'bg-accent' },
    { status: 'DONE', title: 'Done', color: 'bg-success' }
  ];

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDrop = (status: TaskStatus) => {
    if (draggedTask) {
      setTasks(prev => prev.map(task => 
        task.id === draggedTask ? { ...task, status } : task
      ));
      setDraggedTask(null);
    }
  };

  const mockCodeFiles = [
    { name: "src/App.tsx", type: "file" },
    { name: "src/components/", type: "folder" },
    { name: "src/utils/", type: "folder" },
    { name: "package.json", type: "file" },
    { name: "README.md", type: "file" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-lg font-semibold">E-Commerce Dashboard</h1>
              <p className="text-sm text-muted-foreground">Intermediate • 3 weeks</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="glass">
              <Upload className="h-4 w-4 mr-2" />
              Submit
            </Button>
            <Button size="sm" className="gradient-primary">
              <MessageSquare className="h-4 w-4 mr-2" />
              AI Mentor
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="board" className="space-y-6">
          <TabsList className="glass">
            <TabsTrigger value="board">Kanban Board</TabsTrigger>
            <TabsTrigger value="code">Code Editor</TabsTrigger>
            <TabsTrigger value="chat">AI Mentor</TabsTrigger>
          </TabsList>

          {/* Kanban Board */}
          <TabsContent value="board" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {columns.map((column) => (
                <div
                  key={column.status}
                  className="space-y-4"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(column.status);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                      <h3 className="font-semibold">{column.title}</h3>
                      <Badge variant="outline" className="h-5 w-5 p-0 text-xs">
                        {getTasksByStatus(column.status).length}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {getTasksByStatus(column.status).map((task) => (
                      <Card
                        key={task.id}
                        className="glass cursor-move hover-lift transition-smooth"
                        draggable
                        onDragStart={() => handleDragStart(task.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-sm">{task.title}</h4>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">
                            {task.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {task.points} XP
                            </Badge>
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-xs font-bold">JD</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Code Editor */}
          <TabsContent value="code">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
              {/* File Explorer */}
              <Card className="glass">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Project Files</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <ScrollArea className="h-full">
                    <div className="space-y-1">
                      {mockCodeFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-2 rounded hover:bg-muted/20 cursor-pointer text-sm"
                        >
                          <FileCode className="h-4 w-4" />
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Code Editor Area */}
              <Card className="lg:col-span-2 glass">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">src/App.tsx</CardTitle>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Run
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-full bg-muted/10 rounded-lg p-4 font-mono text-sm">
                    <div className="text-muted-foreground">
                      <div className="text-accent">import</div> React <div className="text-accent">from</div> <div className="text-success">'react'</div>;
                    </div>
                    <div className="text-muted-foreground mt-2">
                      <div className="text-accent">function</div> <div className="text-warning">App</div>() {"{"}
                    </div>
                    <div className="text-muted-foreground ml-4 mt-1">
                      <div className="text-accent">return</div> (
                    </div>
                    <div className="text-muted-foreground ml-8 mt-1">
                      {"<div className="}<div className="text-success">"app"</div>{">"}<br/>
                      {"  <h1>Welcome to SkillSync!</h1>"}<br/>
                      {"</div>"}
                    </div>
                    <div className="text-muted-foreground ml-4 mt-1">
                      );
                    </div>
                    <div className="text-muted-foreground mt-1">
                      {"}"}
                    </div>
                    <div className="text-muted-foreground mt-2">
                      <div className="text-accent">export default</div> App;
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Console/Output */}
              <Card className="glass">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Console</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="bg-muted/10 rounded p-3 font-mono text-xs">
                    <div className="text-success">✓ Compiled successfully!</div>
                    <div className="text-muted-foreground mt-2">
                      Local: http://localhost:3000<br/>
                      Network: http://192.168.1.100:3000
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Mentor Chat */}
          <TabsContent value="chat">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <span>AI Mentor Chat</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                        <Brain className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1 p-3 rounded-lg bg-muted/20">
                        <p className="text-sm">
                          Welcome to your AI mentor! I'm here to help you with any questions about your project. 
                          How can I assist you today?
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold">JD</span>
                      </div>
                      <div className="flex-1 p-3 rounded-lg bg-primary/10">
                        <p className="text-sm">
                          I'm working on the authentication flow but I'm stuck on form validation. Can you help?
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                        <Brain className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1 p-3 rounded-lg bg-muted/20">
                        <p className="text-sm mb-2">
                          I'd be happy to help with form validation! Here are some key tips:
                        </p>
                        <ul className="text-sm space-y-1 list-disc ml-4 text-muted-foreground">
                          <li>Use controlled components with useState for form state</li>
                          <li>Implement real-time validation with onChange handlers</li>
                          <li>Consider using libraries like Zod for schema validation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Ask your AI mentor anything..."
                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-background"
                    />
                    <Button size="sm" className="gradient-primary">
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Request Code Review
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileCode className="h-4 w-4 mr-2" />
                    Debug Help
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Task
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkspacePreview;