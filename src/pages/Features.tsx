
import React from 'react';
import { useTheme } from 'next-themes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Trophy, MessageSquare, Calendar, Target } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Features = () => {
  const { theme } = useTheme();
  
  const features = [
    {
      icon: BookOpen,
      title: "Skill Exchange",
      description: "Learn new skills from experts and teach what you know best"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Connect with like-minded learners and build lasting relationships"
    },
    {
      icon: Trophy,
      title: "Achievements",
      description: "Track your progress and earn badges for your accomplishments"
    },
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description: "Communicate instantly with your learning partners"
    },
    {
      icon: Calendar,
      title: "Scheduling",
      description: "Organize your learning sessions with integrated calendar"
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set and achieve your learning objectives systematically"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Powerful Features for <span className="text-primary">Learning</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover all the tools you need to excel in your learning journey and connect with others.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-card border-border">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10 mr-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Features;
