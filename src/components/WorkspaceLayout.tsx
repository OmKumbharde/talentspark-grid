import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, MessageCircle, Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface WorkspaceLayoutProps {
  projectId: string;
  onBack: () => void;
}

export default function WorkspaceLayout({ onBack }: WorkspaceLayoutProps) {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('kanban');

  // Mock project data
  const project = {
    id: projectId || 'project-1',
    title: 'React Portfolio Website',
    description: 'Build a responsive portfolio website using React and Tailwind CSS',
    progress: 65,
    status: 'in_progress',
    tasks: [
      { id: '1', title: 'Setup project structure', status: 'done', points: 5 },
      { id: '2', title: 'Create header component', status: 'done', points: 3 },
      { id: '3', title: 'Build contact form', status: 'in_progress', points: 8 },
      { id: '4', title: 'Add animations', status: 'todo', points: 5 },
      { id: '5', title: 'Deploy to production', status: 'todo', points: 3 }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{project.title}</h1>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">
                Progress: {project.progress}%
              </Badge>
              <Button size="sm">
                <Play className="h-4 w-4 mr-2" />
                Run Code
              </Button>
            </div>
          </div>
          <Progress value={project.progress} className="mt-4" />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="kanban">Tasks</TabsTrigger>
            <TabsTrigger value="editor">Code Editor</TabsTrigger>
            <TabsTrigger value="mentor">AI Mentor</TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Todo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-gray-400" />
                    Todo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.tasks.filter(task => task.status === 'todo').map(task => (
                    <Card key={task.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{task.title}</span>
                        <Badge variant="outline">{task.points} pts</Badge>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* In Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    In Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.tasks.filter(task => task.status === 'in_progress').map(task => (
                    <Card key={task.id} className="p-3 border-yellow-500/50">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{task.title}</span>
                        <Badge variant="outline">{task.points} pts</Badge>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Done */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Done
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.tasks.filter(task => task.status === 'done').map(task => (
                    <Card key={task.id} className="p-3 border-green-500/50">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{task.title}</span>
                        <Badge variant="outline">{task.points} pts</Badge>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="editor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Code Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                  <div className="text-muted-foreground mb-2">// src/App.tsx</div>
                  <div className="space-y-1">
                    <div><span className="text-blue-400">import</span> React <span className="text-blue-400">from</span> <span className="text-green-400">'react'</span>;</div>
                    <div><span className="text-blue-400">import</span> <span className="text-yellow-400">{'{'}</span> Header <span className="text-yellow-400">{'}'}</span> <span className="text-blue-400">from</span> <span className="text-green-400">'./components/Header'</span>;</div>
                    <div></div>
                    <div><span className="text-blue-400">function</span> <span className="text-yellow-400">App</span>() <span className="text-yellow-400">{'{'}</span></div>
                    <div className="ml-4"><span className="text-blue-400">return</span> (</div>
                    <div className="ml-8">&lt;<span className="text-red-400">div</span> <span className="text-green-400">className</span>=<span className="text-green-400">"App"</span>&gt;</div>
                    <div className="ml-12">&lt;<span className="text-red-400">Header</span> /&gt;</div>
                    <div className="ml-8">&lt;/<span className="text-red-400">div</span>&gt;</div>
                    <div className="ml-4">);</div>
                    <div><span className="text-yellow-400">{'}'}</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  AI Mentor Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      AI
                    </div>
                    <div className="flex-1 bg-muted rounded-lg p-3">
                      <p className="text-sm">Welcome to your React Portfolio project! I'm here to help you build an amazing portfolio website. What would you like to work on first?</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 max-w-xs bg-primary rounded-lg p-3">
                      <p className="text-sm text-primary-foreground">I'm working on the header component but having trouble with responsive design.</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                      You
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      AI
                    </div>
                    <div className="flex-1 bg-muted rounded-lg p-3">
                      <p className="text-sm">Great question! For responsive headers, I recommend using Tailwind's responsive classes. Try using `md:flex` for desktop and `hidden md:block` for mobile-specific elements. Would you like me to show you a code example?</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Ask your mentor anything..."
                    className="flex-1 px-3 py-2 border border-border rounded-md bg-background"
                  />
                  <Button size="sm">Send</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}