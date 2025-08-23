import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Edit3,
  User,
  MapPin,
  Clock,
  Target,
  Code2,
  Github,
  Linkedin,
  Mail,
  Calendar,
  Trophy,
  Star,
  X,
  Plus
} from "lucide-react";
import { OnboardingData } from "@/lib/types";
import { SKILLS } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface ProfileSectionProps {
  userData: OnboardingData;
}

export const ProfileSection = ({ userData }: ProfileSectionProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    timezone: userData.profile.timezone || "UTC-5",
    location: userData.profile.location || "San Francisco, CA",
    experience: userData.profile.experience || "Intermediate",
    weeklyHours: userData.profile.weeklyHours || 15,
    goals: userData.profile.goals || "Master React and Node.js to become a full-stack developer. Build 3 major projects and contribute to open source.",
    githubUrl: userData.profile.githubUrl || "https://github.com/johndoe",
    linkedinUrl: userData.profile.linkedinUrl || "https://linkedin.com/in/johndoe"
  });
  const [userSkills, setUserSkills] = useState(userData.skills || [
    { skillId: "react", level: 4 },
    { skillId: "javascript", level: 4 },
    { skillId: "node", level: 3 },
    { skillId: "css", level: 3 },
    { skillId: "git", level: 3 }
  ]);
  const [availableDays, setAvailableDays] = useState(userData.preferences?.availableDays || ["Monday", "Wednesday", "Friday", "Sunday"]);

  const handleSaveProfile = () => {
    // Simulate saving to database
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const addSkill = (skillId: string, level: number) => {
    if (!userSkills.find(s => s.skillId === skillId)) {
      setUserSkills([...userSkills, { skillId, level }]);
    }
  };

  const removeSkill = (skillId: string) => {
    setUserSkills(userSkills.filter(s => s.skillId !== skillId));
  };

  const updateSkillLevel = (skillId: string, level: number) => {
    setUserSkills(userSkills.map(s => 
      s.skillId === skillId ? { ...s, level } : s
    ));
  };

  const getSkillName = (skillId: string) => {
    return SKILLS.find(s => s.id === skillId)?.name || skillId;
  };

  const renderSkillLevel = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < level ? 'text-warning fill-warning' : 'text-muted'}`}
      />
    ));
  };

  const mockStats = {
    projectsCompleted: 3,
    totalXP: 1250,
    currentStreak: 7,
    badgesEarned: 4,
    joinedDate: "March 2024"
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="glass hover-lift">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                <AvatarFallback className="gradient-primary text-primary-foreground text-xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{editData.name}</h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {editData.email}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {editData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {editData.timezone}
                  </span>
                </div>
              </div>
            </div>

            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="outline" className="glass">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your profile information and preferences
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="basic" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={editData.name}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editData.location}
                          onChange={(e) => setEditData({...editData, location: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select value={editData.timezone} onValueChange={(value) => setEditData({...editData, timezone: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC-8">UTC-8 (Pacific)</SelectItem>
                            <SelectItem value="UTC-7">UTC-7 (Mountain)</SelectItem>
                            <SelectItem value="UTC-6">UTC-6 (Central)</SelectItem>
                            <SelectItem value="UTC-5">UTC-5 (Eastern)</SelectItem>
                            <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                            <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="experience">Experience Level</Label>
                        <Select value={editData.experience} onValueChange={(value) => setEditData({...editData, experience: value as any})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="weeklyHours">Weekly Hours</Label>
                        <Input
                          id="weeklyHours"
                          type="number"
                          value={editData.weeklyHours}
                          onChange={(e) => setEditData({...editData, weeklyHours: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="goals">Learning Goals</Label>
                      <Textarea
                        id="goals"
                        value={editData.goals}
                        onChange={(e) => setEditData({...editData, goals: e.target.value})}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="github">GitHub URL</Label>
                        <Input
                          id="github"
                          value={editData.githubUrl}
                          onChange={(e) => setEditData({...editData, githubUrl: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input
                          id="linkedin"
                          value={editData.linkedinUrl}
                          onChange={(e) => setEditData({...editData, linkedinUrl: e.target.value})}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4">
                    <div>
                      <Label>Your Skills</Label>
                      <div className="space-y-3 mt-2">
                        {userSkills.map((skill) => (
                          <div key={skill.skillId} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <span className="font-medium">{getSkillName(skill.skillId)}</span>
                              <div className="flex space-x-1">
                                {renderSkillLevel(skill.level)}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Select value={skill.level.toString()} onValueChange={(value) => updateSkillLevel(skill.skillId, parseInt(value))}>
                                <SelectTrigger className="w-20">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button variant="ghost" size="sm" onClick={() => removeSkill(skill.skillId)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Add New Skill</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {SKILLS.filter(skill => !userSkills.find(s => s.skillId === skill.id)).map((skill) => (
                          <Button
                            key={skill.id}
                            variant="outline"
                            size="sm"
                            onClick={() => addSkill(skill.id, 1)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            {skill.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preferences" className="space-y-4">
                    <div>
                      <Label>Available Days</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                          <label key={day} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={availableDays.includes(day)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setAvailableDays([...availableDays, day]);
                                } else {
                                  setAvailableDays(availableDays.filter(d => d !== day));
                                }
                              }}
                              className="rounded"
                            />
                            <span>{day}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile} className="gradient-primary">
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient">{mockStats.projectsCompleted}</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient">{mockStats.totalXP}</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient">{mockStats.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient">{mockStats.badgesEarned}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Overview */}
        <Card className="glass hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Skills & Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userSkills.map((skill) => (
                <div key={skill.skillId} className="flex items-center justify-between">
                  <span className="font-medium">{getSkillName(skill.skillId)}</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {renderSkillLevel(skill.level)}
                    </div>
                    <Badge variant="outline">{skill.level}/5</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Goals & Info */}
        <Card className="glass hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Learning Goals & Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Goals</h4>
              <p className="text-sm text-muted-foreground">{editData.goals}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <span className="text-sm text-muted-foreground">Experience Level</span>
                <p className="font-semibold">{editData.experience}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Weekly Hours</span>
                <p className="font-semibold">{editData.weeklyHours}h</p>
              </div>
            </div>

            <div className="flex space-x-4 pt-4 border-t">
              {editData.githubUrl && (
                <a href={editData.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              )}
              {editData.linkedinUrl && (
                <a href={editData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>

            <div className="pt-4 border-t">
              <span className="text-sm text-muted-foreground">Available Days</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {availableDays.map((day) => (
                  <Badge key={day} variant="outline" className="text-xs">
                    {day.slice(0, 3)}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};