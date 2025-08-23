import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTASectionProps {
  onGetStarted: () => void;
}

const CTASection = ({ onGetStarted }: CTASectionProps) => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-hero opacity-30"></div>
      <div className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-40 h-40 rounded-full bg-accent/10 blur-3xl"></div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full gradient-primary glow animate-pulse-glow">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your{" "}
            <span className="text-gradient">Career</span>?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who are already building their future with SkillSync. 
            Start your first micro-internship today and experience the difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gradient-primary hover:opacity-90 transition-opacity text-lg px-8 glow"
              onClick={onGetStarted}
            >
              Begin Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 glass hover-lift"
            >
              Schedule Demo
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            ✨ No credit card required • Free to start • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;