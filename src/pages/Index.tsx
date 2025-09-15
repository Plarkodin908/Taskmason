
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEO/SEOHead";
import SchemaMarkup from "@/components/SEO/SchemaMarkup";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import MobileNavBar from "@/components/MobileNavBar";

const Index = () => {
  const { user } = useAuth();

  // Add preloading for key resources
  useEffect(() => {
    // Preload critical images
    const imagesToPreload = [
      "/lovable-uploads/7fa67612-a8dd-4f50-bb04-411ef3855c5c.png",
      "/lovable-uploads/43cf2307-26cc-408d-b7ec-b67811205dab.png",
      "/lovable-uploads/609db0c7-2e29-405b-ad44-bee4b401e14e.png",
      "/lovable-uploads/6a919366-1f11-4890-a656-15f1262cac03.jpg",
      "/lovable-uploads/44320338-928a-4f87-80c5-b108d09edc5e.png",
      "/lovable-uploads/54ffc2eb-8b8d-4893-beca-68661a996ce4.png"
    ];
    
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Animated background pattern */}
      <div className="animated-pattern-container"></div>
      <div className="animated-pattern-overlay"></div>
      
      {/* Enhanced overlay for better text readability */}
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40 pointer-events-none z-0"></div>
      
      <SEOHead 
        title="Taskmason - Community-Driven Learning Platform" 
        description="Exchange skills that match your coding success with ease using our innovative learning marketplace." 
      />
      
      <SchemaMarkup 
        type="website" 
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Taskmason",
          "url": "https://www.taskmaso-n.web.app/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.taskmaso-n.web.app/marketplace?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://twitter.com/taskmason",
            "https://www.facebook.com/taskmason",
            "https://www.linkedin.com/company/taskmason"
          ]
        }} 
      />
      
      <Navbar />
      
      <main className="relative z-10">
        {/* Hero Section - Simplified to match requirements */}
        <section className="content-section section-container relative min-h-[80vh] flex items-center">
          <div className="absolute inset-0 bg-black/30 dark:bg-black/20 backdrop-blur-sm"></div>
          <div className="container mx-auto relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Unlock Your Potential
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Connect with experts, learn new skills, and grow your career with our community-driven learning platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/marketplace">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-6 text-lg shadow-xl">
                  <span>Explore Courses</span>
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              {!user ? (
                <Link to="/auth/sign-up">
                  <Button variant="outline" className="border-white/30 hover:bg-white/10 px-8 py-6 text-lg text-white bg-transparent backdrop-blur-sm shadow-xl">
                    <span>Join Free</span>
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <Button variant="outline" className="border-white/30 hover:bg-white/10 px-8 py-6 text-lg text-white bg-transparent backdrop-blur-sm shadow-xl">
                    <span>Go to Dashboard</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Add Mobile Navigation */}
      <MobileNavBar />
    </div>
  );
};

export default Index;
