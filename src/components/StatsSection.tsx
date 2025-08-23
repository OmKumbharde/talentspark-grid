import { Card, CardContent } from "@/components/ui/card";

const StatsSection = () => {
  const stats = [
    {
      number: "10,000+",
      label: "Students Enrolled",
      description: "Active learners worldwide"
    },
    {
      number: "500+",
      label: "Partner Companies",
      description: "Industry collaborations"
    },
    {
      number: "95%",
      label: "Success Rate",
      description: "Project completion"
    },
    {
      number: "50K+",
      label: "Projects Completed",
      description: "Real-world experience"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Trusted by <span className="text-gradient">Thousands</span> of Students
          </h2>
          <p className="text-xl text-muted-foreground">
            Join a community that's already transforming careers through practical experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="text-center glass hover-lift transition-smooth animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;