
import { BookOpen, Users, Award, MessageSquare, Zap, Shield } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import Card3D from "./3d/Card3D";
import Text3D from "./3d/Text3D";

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience and proven track records."
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Connect with peers, join study groups, and collaborate on projects together."
    },
    {
      icon: Award,
      title: "Skill Verification",
      description: "Earn verified badges and certificates to showcase your expertise to employers."
    },
    {
      icon: MessageSquare,
      title: "Interactive Discussions",
      description: "Engage in meaningful conversations and get personalized feedback from instructors."
    },
    {
      icon: Zap,
      title: "Personalized Learning",
      description: "AI-powered recommendations adapt to your learning style and pace."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data and progress are protected with enterprise-grade security."
    }
  ];

  return (
    <section id="features" className="content-section relative transform-3d section-container">
      <div className="container mx-auto">
        <ScrollReveal className="text-center mb-12">
          <Text3D as="h2" variant="glow" className="section-title text-center text-white">
            Why Choose Taskmason?
          </Text3D>
          <p className="section-subtitle text-center max-w-2xl mx-auto text-white/80">
            Discover the features that make our platform the perfect choice for your learning journey.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100}>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:shadow-lg hover:shadow-primary/20 hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
