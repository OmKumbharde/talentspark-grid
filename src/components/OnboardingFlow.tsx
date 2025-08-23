import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ArrowRight, ArrowLeft, MapPin, Clock, Target } from "lucide-react";
import { SKILLS } from "@/lib/mockData";
import { OnboardingData } from "@/lib/types";

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    profile: {
      timezone: "UTC",
      experience: "Beginner",
      weeklyHours: 10
    },
    skills: [],
    preferences: {
      projectTypes: [],
      stackFocus: [],
      availableDays: []
    }
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateProfile = (field: string, value: any) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, [field]: value }
    }));
  };

  const toggleSkill = (skillId: string) => {
    setData(prev => {
      const existing = prev.skills.find(s => s.skillId === skillId);
      if (existing) {
        return {
          ...prev,
          skills: prev.skills.filter(s => s.skillId !== skillId)
        };
      } else {
        return {
          ...prev,
          skills: [...prev.skills, { skillId, level: 3 }]
        };
      }
    });
  };

  const updateSkillLevel = (skillId: string, level: number) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => 
        s.skillId === skillId ? { ...s, level } : s
      )
    }));
  };

  const togglePreference = (category: string, value: string) => {
    setData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: prev.preferences[category as keyof typeof prev.preferences].includes(value)
          ? prev.preferences[category as keyof typeof prev.preferences].filter(item => item !== value)
          : [...prev.preferences[category as keyof typeof prev.preferences], value]
      }
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
              <p className="text-muted-foreground">Help us personalize your learning experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA"
                  value={data.profile.location || ""}
                  onChange={(e) => updateProfile("location", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  value={data.profile.timezone} 
                  onValueChange={(value) => updateProfile("timezone", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    <SelectItem value="Europe/London">London</SelectItem>
                    <SelectItem value="Europe/Paris">Paris</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select 
                  value={data.profile.experience} 
                  onValueChange={(value) => updateProfile("experience", value)}
                >
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

              <div className="space-y-2">
                <Label>Weekly Hours Available: {data.profile.weeklyHours} hours</Label>
                <Slider
                  value={[data.profile.weeklyHours || 10]}
                  onValueChange={([value]) => updateProfile("weeklyHours", value)}
                  max={40}
                  min={5}
                  step={5}
                  className="mt-4"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">Learning Goals (Optional)</Label>
              <Textarea
                id="goals"
                placeholder="What do you hope to achieve? e.g., Build a portfolio, Learn new technologies, Prepare for internships..."
                value={data.profile.goals || ""}
                onChange={(e) => updateProfile("goals", e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Choose your skills</h2>
              <p className="text-muted-foreground">Select the technologies you know or want to learn</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SKILLS.map((skill) => {
                const isSelected = data.skills.some(s => s.skillId === skill.id);
                const skillData = data.skills.find(s => s.skillId === skill.id);
                
                return (
                  <Card 
                    key={skill.id} 
                    className={`cursor-pointer transition-all hover-lift ${
                      isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => toggleSkill(skill.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <div>
                          <h3 className="font-semibold">{skill.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {skill.area}
                          </Badge>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="space-y-2">
                          <Label className="text-sm">
                            Level: {skillData?.level || 3}/5
                          </Label>
                          <Slider
                            value={[skillData?.level || 3]}
                            onValueChange={([value]) => updateSkillLevel(skill.id, value)}
                            max={5}
                            min={1}
                            step={1}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Project preferences</h2>
              <p className="text-muted-foreground">What type of projects interest you most?</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Project Types</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Web Apps", "Mobile Apps", "APIs", "Data Analysis", "AI/ML", "DevOps"].map((type) => (
                    <Badge
                      key={type}
                      variant={data.preferences.projectTypes.includes(type) ? "default" : "outline"}
                      className="cursor-pointer p-3 justify-center hover-lift"
                      onClick={() => togglePreference("projectTypes", type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Technology Focus</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["Frontend", "Backend", "Full-Stack", "Mobile", "Data", "DevOps", "Design", "Testing"].map((focus) => (
                    <Badge
                      key={focus}
                      variant={data.preferences.stackFocus.includes(focus) ? "default" : "outline"}
                      className="cursor-pointer p-3 justify-center hover-lift"
                      onClick={() => togglePreference("stackFocus", focus)}
                    >
                      {focus}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Available Days</h3>
                <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <Badge
                      key={day}
                      variant={data.preferences.availableDays.includes(day) ? "default" : "outline"}
                      className="cursor-pointer p-3 justify-center hover-lift"
                      onClick={() => togglePreference("availableDays", day)}
                    >
                      {day.slice(0, 3)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full gradient-primary glow mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">You're all set!</h2>
              <p className="text-muted-foreground">Review your profile and start your journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-semibold">{data.profile.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly Hours:</span>
                    <span className="font-semibold">{data.profile.weeklyHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Skills Selected:</span>
                    <span className="font-semibold">{data.skills.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Project Types:</span>
                    <span className="font-semibold">{data.preferences.projectTypes.length}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Selected Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill) => {
                      const skillInfo = SKILLS.find(s => s.id === skill.skillId);
                      return (
                        <Badge key={skill.skillId} variant="secondary">
                          {skillInfo?.icon} {skillInfo?.name} (Level {skill.level})
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl glass">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-2xl">Welcome to SkillSync</CardTitle>
              <CardDescription>Step {currentStep} of {totalSteps}</CardDescription>
            </div>
            <div className="w-32">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="min-h-[500px]">
          {renderStep()}
        </CardContent>

        <div className="flex justify-between p-6 border-t border-border/40">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="glass"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            className="gradient-primary hover:opacity-90 transition-opacity"
          >
            {currentStep === totalSteps ? "Complete Setup" : "Next"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingFlow;