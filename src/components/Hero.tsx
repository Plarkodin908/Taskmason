
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, GraduationCap, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSiteStats } from "@/hooks/useSiteStats";
import ScrollReveal from "./ScrollReveal";
import FloatingShapes from "./3d/FloatingShapes";
import Card3D from "./3d/Card3D";
import Button3D from "./3d/Button3D";
import Text3D from "./3d/Text3D";
import FeaturesCarousel from "./FeaturesCarousel";

const Hero = () => {
  const { user } = useAuth();
  const { stats, isLoading } = useSiteStats();
  
  const formatNumber = (num: number) => {
    if (num === 0) return "0";
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k+`;
    }
    return `${num}+`;
  };
  
  return (
    <section className="relative pt-24 md:pt-32 pb-16 px-4 overflow-hidden transform-3d">
      {/* Animated pattern background */}
      <div className="animated-pattern-container"></div>
      <div className="animated-pattern-overlay"></div>
      
      {/* Enhanced overlay for better text readability - lighter for light mode */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/30 pointer-events-none"></div>
      
      {/* 3D Floating Shapes */}
      <FloatingShapes />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <ScrollReveal direction="left" className="w-full md:w-1/2 space-y-6">
            <Text3D as="h1" variant="glow" className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white drop-shadow-2xl">
              Unlock Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Potential</span>
            </Text3D>
            
            <p className="text-md md:text-lg text-slate-800 dark:text-white/80 max-w-lg drop-shadow-lg font-medium">
              Connect with experts, share your skills, and grow together in our community-driven learning platform.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              {user ? (
                <>
                  <Link to="/profile">
                    <Button3D className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 md:px-6 md:py-6 text-sm md:text-base shadow-xl">
                      <span>Manage Profile</span>
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button3D>
                  </Link>
                  <Link to="/marketplace">
                    <Button3D variant="outline" className="border-2 border-slate-400 text-slate-900 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800/10 px-4 py-2 md:px-6 md:py-6 text-sm md:text-base bg-white/95 dark:bg-transparent backdrop-blur-sm shadow-xl">
                      <span>Explore Marketplace</span>
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button3D>
                  </Link>
                </>
              ) : (
                <Link to="/auth/sign-up">
                  <Button3D className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 md:px-6 md:py-6 text-sm md:text-base shadow-xl">
                    <span>Take the First Step</span>
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button3D>
                </Link>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <Card3D variant="hover" className="flex items-center gap-2 bg-white/95 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 backdrop-blur-sm rounded-lg px-3 py-2 shadow-xl">
                <BookOpen className="text-slate-700 dark:text-gray-400 h-4 w-4 md:h-5 md:w-5" />
                <span className="text-slate-900 dark:text-gray-300 text-sm md:text-base font-medium">
                  {isLoading ? "..." : `${formatNumber(stats.totalCourses)} Courses`}
                </span>
              </Card3D>
              <Card3D variant="hover" className="flex items-center gap-2 bg-white/95 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 backdrop-blur-sm rounded-lg px-3 py-2 my-[15px] shadow-xl">
                <Users className="text-slate-700 dark:text-gray-400 h-4 w-4 md:h-5 md:w-5" />
                <span className="text-slate-900 dark:text-gray-300 text-sm md:text-base font-medium">
                  {isLoading ? "..." : `${formatNumber(stats.totalUsers)} Members`}
                </span>
              </Card3D>
              <Card3D variant="hover" className="flex items-center gap-2 bg-white/95 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 backdrop-blur-sm rounded-lg px-3 py-2 shadow-xl">
                <GraduationCap className="text-slate-700 dark:text-gray-400 h-4 w-4 md:h-5 md:w-5" />
                <span className="text-slate-900 dark:text-gray-300 text-sm md:text-base font-medium">Expert Instructors</span>
              </Card3D>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right" className="w-full md:w-1/2 flex justify-center">
            <FeaturesCarousel variant="hero" className="relative z-20" />
          </ScrollReveal>
        </div>
        
        <div className="mt-12 flex justify-center">
          <Card3D variant="hover">
            <a href="#features" className="flex flex-col items-center text-slate-800 dark:text-white/60 hover:text-slate-900 dark:hover:text-gray-400 transition-colors p-4 rounded-lg bg-white/95 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 backdrop-blur-sm shadow-xl">
              <span className="text-sm mb-2 font-medium">Explore More</span>
              <ChevronDown className="h-6 w-6 float-3d" />
            </a>
          </Card3D>
        </div>
      </div>
    </section>
  );
};

export default Hero;
