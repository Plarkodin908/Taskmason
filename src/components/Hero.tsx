
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

const Hero = () => {
  const { user } = useAuth();
  const { stats, isLoading } = useSiteStats();
  
  const formatNumber = (num: number) => {
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
      
      {/* 3D Floating Shapes */}
      <FloatingShapes />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <ScrollReveal direction="left" className="w-full md:w-1/2 space-y-6">
            <Text3D as="h1" variant="glow" className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              Unlock Your <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">Potential</span>
            </Text3D>
            
            <p className="text-md md:text-lg text-white/80 max-w-lg">
              Connect with experts, share your skills, and grow together in our community-driven learning platform.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              {user ? (
                <>
                  <Link to="/profile">
                    <Button3D className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-4 py-2 md:px-6 md:py-6 text-sm md:text-base">
                      <span>Manage Profile</span>
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button3D>
                  </Link>
                  <Link to="/marketplace">
                    <Button3D variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800/10 px-4 py-2 md:px-6 md:py-6 text-sm md:text-base">
                      <span>Explore Marketplace</span>
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button3D>
                  </Link>
                </>
              ) : (
                <Link to="/auth/sign-up">
                  <Button3D className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-4 py-2 md:px-6 md:py-6 text-sm md:text-base">
                    <span>Take the First Step</span>
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button3D>
                </Link>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <Card3D variant="hover" className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                <BookOpen className="text-gray-400 h-4 w-4 md:h-5 md:w-5" />
                <span className="text-gray-300 text-sm md:text-base">
                  {isLoading ? "..." : `${formatNumber(stats.totalCourses)} Courses`}
                </span>
              </Card3D>
              <Card3D variant="hover" className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 my-[15px]">
                <Users className="text-gray-400 h-4 w-4 md:h-5 md:w-5" />
                <span className="text-gray-300 text-sm md:text-base">
                  {isLoading ? "..." : `${formatNumber(stats.totalUsers)} Members`}
                </span>
              </Card3D>
              <Card3D variant="hover" className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                <GraduationCap className="text-gray-400 h-4 w-4 md:h-5 md:w-5" />
                <span className="text-gray-300 text-sm md:text-base">Expert Instructors</span>
              </Card3D>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right" className="w-full md:w-1/2 flex justify-center">
            <Card3D variant="tilt" className="relative">
              {/* Animated collaboration illustration */}
              <div className="relative z-20">
                <img 
                  alt="Users collaborating" 
                  className="max-w-full w-full md:max-w-md mx-auto float-3d" 
                  src="/lovable-uploads/79bf9c55-24c6-4feb-84ff-310a64214018.png" 
                  loading="eager"
                />
              </div>
              <div className="absolute -z-10 w-full h-full bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-full blur-3xl shape-3d"></div>
            </Card3D>
          </ScrollReveal>
        </div>
        
        <div className="mt-12 flex justify-center">
          <Card3D variant="hover">
            <a href="#features" className="flex flex-col items-center text-white/60 hover:text-gray-400 transition-colors p-4 rounded-lg bg-white/5 backdrop-blur-sm">
              <span className="text-sm mb-2">Explore More</span>
              <ChevronDown className="h-6 w-6 float-3d" />
            </a>
          </Card3D>
        </div>
      </div>
    </section>
  );
};

export default Hero;
