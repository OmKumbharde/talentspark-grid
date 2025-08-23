import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  BookOpen,
  Terminal,
  GitBranch,
  Send
} from "lucide-react";
import { AIMentorChat } from "@/components/AIMentorChat";
import { motion, AnimatePresence } from "framer-motion";
import { SAMPLE_TASKS } from "@/lib/mockData";

interface WorkspaceLayoutProps {
  projectId: string;
  onBackToDashboard: () => void;
}

export const WorkspaceLayout = ({ projectId, onBackToDashboard }: WorkspaceLayoutProps) => {
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [activeTask, setActiveTask] = useState<string | null>(null);

  // Mock project data
  const projectData = {
    id: projectId,
    title: "Personal Portfolio Website",
    description: "Build a responsive personal portfolio website using React, TypeScript, and Tailwind CSS",
    difficulty: "Intermediate",
    estimatedWeeks: 4,
    currentWeek: 2,
    progress: 45,
    tasks: SAMPLE_TASKS
  };

  const completedTasks = projectData.tasks.filter(task => task.status === 'DONE');
  const currentTask = projectData.tasks.find(task => task.status === 'IN_PROGRESS') || projectData.tasks[0];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBackToDashboard}>
                ← Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{projectData.title}</h1>
                <p className="text-muted-foreground">{projectData.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{projectData.difficulty}</Badge>
              <Badge variant="secondary">Week {projectData.currentWeek}/{projectData.estimatedWeeks}</Badge>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{completedTasks.length}/{projectData.tasks.length} tasks completed</span>
            </div>
            <Progress value={projectData.progress} className="h-2" />
          </div>
        </header>

        {/* Main Workspace */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Tasks and Instructions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Task */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass hover-lift">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Current Task
                      </CardTitle>
                      <Badge variant="secondary">{currentTask?.points} XP</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-3">{currentTask?.title}</h3>
                    <p className="text-muted-foreground mb-4">{currentTask?.description}</p>
                    
                    {currentTask?.acceptance && (
                      <div className="bg-muted/20 p-4 rounded-lg mb-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Acceptance Criteria
                        </h4>
                        <p className="text-sm">{currentTask.acceptance}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Button className="gradient-primary">
                        <Terminal className="h-4 w-4 mr-2" />
                        Open in Editor
                      </Button>
                      <Button variant="outline" className="glass">
                        <GitBranch className="h-4 w-4 mr-2" />
                        View Repository
                      </Button>
                      <Button variant="outline" className="glass">
                        <Send className="h-4 w-4 mr-2" />
                        Submit for Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Task List */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle>All Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectData.tasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-4 rounded-lg border transition-all cursor-pointer hover-lift ${
                          task.id === currentTask?.id ? 'border-primary bg-primary/10' : 'border-border/40'
                        }`}
                        onClick={() => setActiveTask(task.id === activeTask ? null : task.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              task.status === 'DONE' ? 'bg-success' :
                              task.status === 'IN_PROGRESS' ? 'bg-warning' :
                              task.status === 'REVIEW' ? 'bg-accent' :
                              'bg-muted'
                            }`}></div>
                            <div>
                              <h4 className="font-semibold text-sm">{task.title}</h4>
                              <p className="text-xs text-muted-foreground">{task.description.slice(0, 60)}...</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">{task.points} XP</Badge>
                            <Badge variant={
                              task.status === 'DONE' ? 'default' :
                              task.status === 'IN_PROGRESS' ? 'secondary' :
                              'outline'
                            } className="text-xs">
                              {task.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>

                        <AnimatePresence>
                          {activeTask === task.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-3 pt-3 border-t border-border/40"
                            >
                              <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                              {task.acceptance && (
                                <div className="bg-muted/20 p-3 rounded-md">
                                  <h5 className="text-xs font-semibold mb-1">Acceptance Criteria:</h5>
                                  <p className="text-xs">{task.acceptance}</p>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Resources & Tools */}
            <div className="space-y-6">
              {/* Quick Resources */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-lg">Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="docs" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="docs" className="text-xs">
                          <BookOpen className="h-3 w-3 mr-1" />
                          Docs
                        </TabsTrigger>
                        <TabsTrigger value="code" className="text-xs">
                          <Code className="h-3 w-3 mr-1" />
                          Code
                        </TabsTrigger>
                        <TabsTrigger value="files" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          Files
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="docs" className="space-y-2">
                        <div className="space-y-2">
                          <a href="#" className="block p-2 rounded text-sm hover:bg-muted/20 transition-colors">
                            React Documentation
                          </a>
                          <a href="#" className="block p-2 rounded text-sm hover:bg-muted/20 transition-colors">
                            TypeScript Handbook
                          </a>
                          <a href="#" className="block p-2 rounded text-sm hover:bg-muted/20 transition-colors">
                            Tailwind CSS Guide
                          </a>
                        </div>
                      </TabsContent>

                      <TabsContent value="code" className="space-y-2">
                        <div className="space-y-2">
                          <a href="#" className="block p-2 rounded text-sm hover:bg-muted/20 transition-colors">
                            Component Examples
                          </a>
                          <a href="#" className="block p-2 rounded text-sm hover:bg-muted/20 transition-colors">
                            Starter Templates
                          </a>
                          <a href="#" className="block p-2 rounded text-sm hover:bg-muted/20 transition-colors">
                            Code Snippets
                          </a>
                        </div>
                      </TabsContent>

                      <TabsContent value="files" className="space-y-2">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 p-2 rounded text-sm hover:bg-muted/20 transition-colors cursor-pointer">
                            <FileText className="h-4 w-4" />
                            <span>README.md</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 rounded text-sm hover:bg-muted/20 transition-colors cursor-pointer">
                            <FileText className="h-4 w-4" />
                            <span>package.json</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 rounded text-sm hover:bg-muted/20 transition-colors cursor-pointer">
                            <FileText className="h-4 w-4" />
                            <span>src/App.tsx</span>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Project Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-lg">Project Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Completed Tasks</span>
                      <span className="font-semibold">{completedTasks.length}/{projectData.tasks.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total XP</span>
                      <span className="font-semibold text-gradient">
                        {completedTasks.reduce((sum, task) => sum + task.points, 0)} XP
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Time Spent</span>
                      <span className="font-semibold">12.5 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Deadline</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        5 days
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Mentor Chat - Right Panel */}
      <AnimatePresence>
        {!isChatMinimized && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-l border-border/40 bg-background/80 backdrop-blur-sm"
          >
            <div className="h-full p-4">
              <AIMentorChat
                onToggleMinimize={() => setIsChatMinimized(true)}
                className="h-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Chat Button */}
      <AnimatePresence>
        {isChatMinimized && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <AIMentorChat
              isMinimized={true}
              onToggleMinimize={() => setIsChatMinimized(false)}
              className="w-80"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};