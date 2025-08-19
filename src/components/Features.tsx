
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
    <section id="features" className="py-16 px-4 relative transform-3d">
      <div className="container mx-auto">
        <ScrollReveal className="text-center mb-12">
          <Text3D as="h2" variant="glow" className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Why Choose Taskmason?
          </Text3D>
          <p className="text-slate-800 dark:text-white/80 max-w-2xl mx-auto font-medium">
            Discover the features that make our platform the perfect choice for your learning journey.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100}>
              <Card3D 
                variant="tilt" 
                glowOnHover
                className="h-full p-6 rounded-xl bg-white/95 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center float-3d shadow-lg">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <Text3D as="h3" className="text-xl font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </Text3D>
                  <p className="text-slate-700 dark:text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card3D>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
