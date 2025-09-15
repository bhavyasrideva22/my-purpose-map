import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Compass, Target, Users, Zap } from "lucide-react";

const Index = () => {
  const startAssessment = () => {
    window.location.href = "/assessment";
  };

  const features = [
    {
      icon: <Compass className="w-8 h-8 text-values" />,
      title: "Core Values Discovery",
      description: "Identify your top 5 personal values that drive both immediate satisfaction and long-term fulfillment"
    },
    {
      icon: <Target className="w-8 h-8 text-purpose" />,
      title: "Purpose Archetype",
      description: "Discover your dominant purpose orientation and deeper 'why' behind your career choices"
    },
    {
      icon: <Zap className="w-8 h-8 text-fulfillment" />,
      title: "Fulfillment Factors",
      description: "Uncover what brings you energy, meaning, and a true sense of contribution"
    },
    {
      icon: <Users className="w-8 h-8 text-alignment" />,
      title: "PACT Framework",
      description: "Evaluate how your current path supports both your identity and your envisioned future"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="relative max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Legacy vs Immediate Goals
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              A Purpose, Values & Career Alignment Assessment
            </p>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              In a world that constantly demands speed and results, discover whether your current goals 
              serve your immediate needs, your long-term vision, or both. Get clarity on your values, 
              purpose archetype, and career alignment.
            </p>
          </div>

          <Button 
            onClick={startAssessment}
            size="lg"
            className="text-lg px-8 py-6 bg-primary hover:bg-primary-glow transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            What You'll Discover
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-gradient-card border-border/50 hover:shadow-lg transition-all duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Preview */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Your Personalized Results</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            After completing the assessment, you'll receive comprehensive insights including:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold text-values mb-2">Values Profile</h3>
              <p className="text-sm text-muted-foreground">Your top 5 ranked core values with insights</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold text-purpose mb-2">Purpose Archetype</h3>
              <p className="text-sm text-muted-foreground">Your dominant purpose identity and alignment score</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold text-fulfillment mb-2">Career Guidance</h3>
              <p className="text-sm text-muted-foreground">Personalized role and environment recommendations</p>
            </div>
          </div>

          <Button 
            onClick={startAssessment}
            size="lg"
            className="bg-primary hover:bg-primary-glow transition-all duration-300"
          >
            Begin Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">
            Takes approximately 10-15 minutes • Completely private • Instant results
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
