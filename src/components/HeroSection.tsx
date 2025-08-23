import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code2, Zap, Trophy } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-50"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-primary/20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 rounded-full bg-accent/20 animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-40 right-10 w-8 h-8 rounded-full bg-primary-glow/30 animate-float" style={{ animationDelay: "2s" }}></div>

      <div className="container mx-auto text-center relative z-10">
        <Badge variant="secondary" className="mb-6 animate-fade-in">
          🚀 Now in Beta - Join the Future of Learning
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Master Skills Through{" "}
          <span className="text-gradient">AI-Powered</span>{" "}
          Micro-Internships
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
          Connect with real projects, build your portfolio, and accelerate your career 
          with personalized AI mentorship and industry-standard workflows.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
          <Button 
            size="lg" 
            className="gradient-primary hover:opacity-90 transition-opacity text-lg px-8 glow"
            onClick={onGetStarted}
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 glass hover-lift"
          >
            Watch Demo
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in">
          <div className="flex items-center justify-center space-x-3 p-4 rounded-xl glass hover-lift">
            <Code2 className="h-8 w-8 text-primary" />
            <div className="text-left">
              <h3 className="font-semibold">Real Projects</h3>
              <p className="text-sm text-muted-foreground">Industry challenges</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 p-4 rounded-xl glass hover-lift">
            <Zap className="h-8 w-8 text-accent" />
            <div className="text-left">
              <h3 className="font-semibold">AI Mentorship</h3>
              <p className="text-sm text-muted-foreground">24/7 guidance</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 p-4 rounded-xl glass hover-lift">
            <Trophy className="h-8 w-8 text-warning" />
            <div className="text-left">
              <h3 className="font-semibold">Skill Badges</h3>
              <p className="text-sm text-muted-foreground">Verified achievements</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;