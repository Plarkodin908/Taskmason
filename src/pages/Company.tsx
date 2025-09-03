
import React from 'react';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Target, Heart, Globe } from 'lucide-react';

const Company = () => {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "We believe in the power of community-driven learning and support."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from product to service."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We're passionate about helping people unlock their potential."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making quality education accessible to everyone, everywhere."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About <span className="text-primary">TaskMason</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We're on a mission to democratize learning and make skill development accessible to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
              <p className="text-white/80 mb-4">
                TaskMason was born from the belief that everyone has something valuable to teach and learn. 
                We saw a world where traditional education barriers prevented people from sharing knowledge 
                and growing together.
              </p>
              <p className="text-white/80">
                Our platform connects learners and teachers in meaningful ways, creating a community where 
                skills are exchanged, relationships are built, and everyone grows together.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
              <p className="text-white/80 mb-4">
                To create a world where learning is collaborative, accessible, and enjoyable for everyone. 
                We believe that the best learning happens when people come together to share their knowledge 
                and experiences.
              </p>
              <p className="text-white/80">
                By building tools that facilitate meaningful connections and skill exchange, we're helping 
                to create a more educated and connected world.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="p-6 text-center bg-white/10 border-white/20">
                    <div className="p-3 rounded-full bg-primary/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{value.title}</h3>
                    <p className="text-white/80">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Company;
