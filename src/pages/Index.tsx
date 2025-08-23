import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Users, 
  Trophy, 
  Zap, 
  CheckCircle, 
  Star,
  ArrowRight,
  Github,
  Linkedin,
  BookOpen,
  Target,
  MessageSquare,
  Award
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import OnboardingFlow from "@/components/OnboardingFlow";
import Dashboard from "@/components/Dashboard";
import { WorkspaceLayout } from "@/components/WorkspaceLayout";
import { OnboardingData } from "@/lib/types";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'onboarding' | 'dashboard' | 'workspace'>('landing');
  const [userData, setUserData] = useState<OnboardingData | null>(null);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const handleGetStarted = () => {
    setCurrentView('onboarding');
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserData(data);
    setCurrentView('dashboard');
  };

  const handleStartProject = (projectId: string) => {
    setCurrentProjectId(projectId);
    setCurrentView('workspace');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentProjectId(null);
  };

  if (currentView === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  if (currentView === 'dashboard' && userData) {
    return <Dashboard userData={userData} onStartProject={handleStartProject} />;
  }

  if (currentView === 'workspace' && currentProjectId) {
    return <WorkspaceLayout projectId={currentProjectId} onBackToDashboard={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg gradient-primary"></div>
            <span className="text-xl font-bold">SkillSync</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">About</Button>
            <Button variant="outline" onClick={handleGetStarted}>
              Sign In
            </Button>
            <Button 
              className="gradient-primary hover:opacity-90 transition-opacity"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <CTASection onGetStarted={handleGetStarted} />

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 rounded gradient-primary"></div>
                <span className="font-bold">SkillSync</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered micro-internships for the next generation of developers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Roadmap</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Documentation</li>
                <li>Blog</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 SkillSync. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button variant="ghost" size="sm">Privacy</Button>
              <Button variant="ghost" size="sm">Terms</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;