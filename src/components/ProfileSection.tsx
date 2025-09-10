import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Award, 
  Target, 
  Edit3, 
  Save, 
  X,
  Github,
  Linkedin,
  Globe
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { toast } from '@/components/ui/use-toast';

export default function ProfileSection() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    bio: 'Full-stack developer passionate about React and modern web technologies. Always eager to learn new skills and tackle challenging projects.',
    location: 'San Francisco, CA',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    website: 'https://johndoe.dev',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS']
  });

  const [newSkill, setNewSkill] = useState('');

  const mockStats = {
    projectsCompleted: 12,
    totalPoints: 1250,
    currentStreak: 7,
    rank: 'Advanced',
    badges: [
      { id: '1', name: 'React Master', description: 'Completed 5 React projects', icon: '⚛️' },
      { id: '2', name: 'Fast Learner', description: 'Completed onboarding in record time', icon: '🚀' },
      { id: '3', name: 'Team Player', description: 'Helped 10 other students', icon: '🤝' },
      { id: '4', name: 'Streak Master', description: '7-day coding streak', icon: '🔥' }
    ],
    skills: [
      { name: 'React', level: 85, projects: 8 },
      { name: 'TypeScript', level: 70, projects: 6 },
      { name: 'Node.js', level: 65, projects: 4 },
      { name: 'Python', level: 80, projects: 5 },
      { name: 'AWS', level: 55, projects: 3 }
    ]
  };

  const handleSave = () => {
    // Mock save functionality
    updateUser({ 
      name: formData.name, 
      email: formData.email 
    });
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || 'John Doe',
      email: user?.email || 'john.doe@example.com',
      bio: 'Full-stack developer passionate about React and modern web technologies. Always eager to learn new skills and tackle challenging projects.',
      location: 'San Francisco, CA',
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      website: 'https://johndoe.dev',
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS']
    });
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`} />
                    <AvatarFallback>{formData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2">
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="text-2xl font-bold"
                        />
                        <Input
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          type="email"
                        />
                      </div>
                    ) : (
                      <div>
                        <h1 className="text-3xl font-bold text-foreground">{formData.name}</h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {formData.email}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {formData.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined March 2024
                      </span>
                      <Badge variant="secondary">{mockStats.rank}</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Projects Completed</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.projectsCompleted}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.totalPoints}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                    <span className="text-2xl">🔥</span>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.currentStreak} days</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                    />
                  ) : (
                    <p className="text-muted-foreground">{formData.bio}</p>
                  )}
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Links</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {isEditing ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="github">GitHub</Label>
                            <Input
                              id="github"
                              value={formData.github}
                              onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input
                              id="linkedin"
                              value={formData.linkedin}
                              onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              value={formData.website}
                              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <a href={formData.github} target="_blank" rel="noopener noreferrer" 
                             className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="h-4 w-4" />
                            GitHub
                          </a>
                          <a href={formData.linkedin} target="_blank" rel="noopener noreferrer"
                             className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </a>
                          <a href={formData.website} target="_blank" rel="noopener noreferrer"
                             className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <Globe className="h-4 w-4" />
                            Website
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {mockStats.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {skill.projects} projects • {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Technologies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="relative group">
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill} size="sm">Add</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockStats.badges.map((badge) => (
                  <Card key={badge.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{badge.icon}</div>
                        <div>
                          <h3 className="font-semibold">{badge.name}</h3>
                          <p className="text-sm text-muted-foreground">{badge.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Account settings and preferences will be available here.
                  </p>
                  <Button variant="outline">Change Password</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}