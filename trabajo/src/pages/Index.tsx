import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Mic, Trophy, Users } from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice Recognition",
      description: "Practice pronunciation with real-time AI feedback",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Interactive Lessons",
      description: "Fun vocabulary and sentence building exercises",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Earn Rewards",
      description: "Collect badges and stars as you learn",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Teacher Dashboard",
      description: "Track student progress and performance",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Children learning English" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Smart English Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Make learning English fun! Interactive lessons with AI-powered pronunciation practice for kids ages 6-12
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="hero"
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6"
            >
              🚀 Start Learning Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/30"
            >
              👨‍🏫 I'm a Teacher
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Kids Love Learning With Us
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-success text-success-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your English Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students already improving their English skills through fun, interactive learning!
          </p>
          <Button 
            size="lg"
            variant="hero"
            onClick={() => navigate("/auth")}
            className="text-lg px-8 py-6"
          >
            🎓 Create Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Smart English Adventure. Making English learning fun for everyone! 🌟</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
