import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Code2, 
  Trophy, 
  MessageSquare, 
  Users, 
  BookOpen,
  Target,
  Star,
  Clock,
  ArrowRight,
  Filter,
  Search
} from "lucide-react";
import { PROJECTS, BADGES, LEADERBOARD, SAMPLE_TASKS } from "@/lib/mockData";
import { OnboardingData } from "@/lib/types";
import { MessagesPanel } from "@/components/MessagesPanel";
import { ProfileSection } from "@/components/ProfileSection";

interface DashboardProps {
  userData: OnboardingData;
  onStartProject: (projectId: string) => void;
}

const Dashboard = ({ userData, onStartProject }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("projects");

  // Mock user data
  const userStats = {
    totalXP: 1250,
    completedProjects: 3,
    activeTasks: 5,
    rank: 42,
    badges: 4
  };

  const myProjects = PROJECTS.slice(0, 2); // Mock enrolled projects
  const availableProjects = PROJECTS.slice(2); // Available projects

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-lg gradient-primary"></div>
            <h1 className="text-xl font-bold">SkillSync</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">3</Badge>
            </Button>
            <Avatar>
              <AvatarFallback className="gradient-primary text-primary-foreground">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h2>
          <p className="text-muted-foreground">Ready to continue your learning journey?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="glass hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total XP</p>
                  <p className="text-2xl font-bold text-gradient">{userStats.totalXP}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <BookOpen className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Projects</p>
                  <p className="text-2xl font-bold">{userStats.completedProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Tasks</p>
                  <p className="text-2xl font-bold">{userStats.activeTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Users className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rank</p>
                  <p className="text-2xl font-bold">#{userStats.rank}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Badges</p>
                  <p className="text-2xl font-bold">{userStats.badges}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* My Projects */}
              <div>
                <h3 className="text-xl font-semibold mb-4">My Projects</h3>
                <div className="space-y-4">
                  {myProjects.map((project) => (
                    <Card key={project.id} className="glass hover-lift">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <Badge variant="secondary">{project.difficulty}</Badge>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => onStartProject(project.id)}
                            className="gradient-primary"
                          >
                            Continue
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {project.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>3/6 tasks</span>
                          </div>
                          <Progress value={50} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Available Projects */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Available Projects</h3>
                  <Button variant="outline" size="sm" className="glass">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                <div className="space-y-4">
                  {availableProjects.map((project) => (
                    <Card key={project.id} className="glass hover-lift">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">{project.difficulty}</Badge>
                              <Badge variant="secondary">
                                <Clock className="h-3 w-3 mr-1" />
                                {project.estimatedWeeks}w
                              </Badge>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onStartProject(project.id)}
                            className="glass"
                          >
                            Start
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card className="glass">
              <CardHeader>
                <CardTitle>My Tasks</CardTitle>
                <CardDescription>Overview of your current tasks across all projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {SAMPLE_TASKS.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 rounded-lg border border-border/40 hover-lift">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          task.status === 'DONE' ? 'bg-success' :
                          task.status === 'IN_PROGRESS' ? 'bg-warning' :
                          task.status === 'REVIEW' ? 'bg-accent' :
                          'bg-muted'
                        }`}></div>
                        <div>
                          <h4 className="font-semibold">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{task.points} XP</Badge>
                        <Badge variant={
                          task.status === 'DONE' ? 'default' :
                          task.status === 'IN_PROGRESS' ? 'secondary' :
                          'outline'
                        }>
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card className="glass h-[600px] flex flex-col">
              <MessagesPanel />
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BADGES.map((badge, index) => {
                const isEarned = index < 3; // Mock some earned badges
                return (
                  <Card key={badge.id} className={`glass hover-lift ${isEarned ? 'ring-2 ring-primary/50' : 'opacity-60'}`}>
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{badge.icon}</div>
                      <h3 className="font-semibold mb-2">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{badge.criteria}</p>
                      <Badge variant={isEarned ? "default" : "outline"}>
                        {badge.xp} XP
                      </Badge>
                      {isEarned && (
                        <div className="mt-3">
                          <Badge variant="secondary">Earned!</Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Global Leaderboard</CardTitle>
                <CardDescription>Top students this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {LEADERBOARD.slice(0, 10).map((entry) => (
                    <div key={entry.studentId} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          entry.rank <= 3 ? 'gradient-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          {entry.rank}
                        </div>
                        <Avatar>
                          <AvatarFallback>{entry.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{entry.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gradient">{entry.xp} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <ProfileSection userData={userData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;