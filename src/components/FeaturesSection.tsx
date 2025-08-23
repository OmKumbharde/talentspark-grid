import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Code2, 
  Users, 
  MessageSquare, 
  Award,
  Target,
  BookOpen,
  CheckCircle,
  Zap
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "AI-Matched Projects",
      description: "Our AI analyzes your skills and preferences to match you with perfect micro-internships.",
      color: "text-primary"
    },
    {
      icon: Code2,
      title: "Workspace Environment",
      description: "Jira-like project management with integrated code editor and real-time collaboration.",
      color: "text-accent"
    },
    {
      icon: MessageSquare,
      title: "24/7 AI Mentor",
      description: "Get instant help, code reviews, and career guidance from your personal AI mentor.",
      color: "text-success"
    },
    {
      icon: Award,
      title: "Skill Verification",
      description: "Earn verifiable badges and certificates that showcase your real-world project experience.",
      color: "text-warning"
    },
    {
      icon: Users,
      title: "Industry Network",
      description: "Connect with mentors, peers, and potential employers through our global community.",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Fast-Track Learning",
      description: "Accelerate your learning with hands-on projects and immediate feedback loops.",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to <span className="text-gradient">Excel</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From AI-powered matching to real-world project experience, 
            we provide the complete ecosystem for your career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="glass hover-lift transition-smooth group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;