
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileNavBar from '@/components/MobileNavBar';
import { Button } from '@/components/ui/button';
import { Users, Target, Award, Globe } from 'lucide-react';

const Company = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center py-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-purple-400">Taskmason</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              We're building the future of skill-based learning and professional development through innovative technology and community-driven experiences.
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Join Our Mission
            </Button>
          </section>

          {/* Mission Section */}
          <section className="py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-300 text-lg mb-6">
                  To democratize access to high-quality education and create meaningful connections between learners and experts worldwide.
                </p>
                <p className="text-gray-300 text-lg">
                  We believe everyone has something valuable to teach and learn, and our platform facilitates these exchanges in meaningful ways.
                </p>
              </div>
              <div className="bg-gray-800 p-8 rounded-lg">
                <Target className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-gray-300">
                  A world where knowledge flows freely, skills are recognized fairly, and everyone has the opportunity to grow professionally.
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Community First</h3>
                <p className="text-gray-300">
                  We prioritize building strong, supportive communities where members help each other succeed.
                </p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Excellence</h3>
                <p className="text-gray-300">
                  We strive for the highest quality in everything we do, from our platform to our support.
                </p>
              </div>
              <div className="text-center">
                <Globe className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Accessibility</h3>
                <p className="text-gray-300">
                  We make learning accessible to everyone, regardless of background or location.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">CEO</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Chief Executive Officer</h3>
                <p className="text-gray-300">
                  Leading our vision for the future of skill-based learning.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">CTO</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Chief Technology Officer</h3>
                <p className="text-gray-300">
                  Building the technology that powers our platform.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">CPO</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Chief Product Officer</h3>
                <p className="text-gray-300">
                  Ensuring our product meets the needs of our community.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
      <MobileNavBar />
    </div>
  );
};

export default Company;
