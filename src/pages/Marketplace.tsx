
import { useState, useEffect } from "react";
import SearchBar from "@/components/marketplace/SearchBar";
import FilterToggle from "@/components/marketplace/FilterToggle";
import FilterPanel from "@/components/marketplace/FilterPanel";
import CourseTabsSection from "@/components/marketplace/CourseTabsSection";
import EmptyCoursesState from "@/components/marketplace/EmptyCoursesState";
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import Navbar from "@/components/Navbar";
import SkillSidebar from "@/components/SkillSidebar";
import MobileNavBar from "@/components/MobileNavBar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Import } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const searchSuggestions = [
    "Web Development",
    "Data Science",
    "UI/UX Design",
    "Mobile App Development",
    "Machine Learning",
    "JavaScript",
    "Python",
    "React",
  ];
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleImportContent = () => {
    if (user && ["Pro Learner", "Educator"].includes(user.membership)) {
      navigate("/import-content");
    } else {
      toast.info("Importing content requires a Pro Learner membership", {
        description: "Upgrade your plan to unlock this feature",
        action: {
          label: "View Plans",
          onClick: () => navigate("/pricing"),
        },
      });
    }
  };
  
  return (
    <div className="relative bg-black min-h-screen">
      {/* Grid pattern background */}
      <div className="grid-pattern-container"></div>
      <div className="grid-pattern-overlay"></div>
      
      <Navbar />
      
      {/* Desktop Layout with Sidebar */}
      <div className="flex">
        <SkillSidebar />
        
        <div className="flex-1">
          <div className="container mx-auto px-4 pt-20 pb-8 has-mobile-nav relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <MarketplaceHeader />
              {!isMobile && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="border-mint/20 text-white hover:bg-mint/10 flex items-center gap-2"
                    onClick={handleImportContent}
                  >
                    <Import className="h-4 w-4" />
                    <span className="hidden md:inline">Import Content</span>
                    <span className="md:hidden">Import</span>
                  </Button>
                  <Link to="/">
                    <Button variant="outline" className="border-mint/20 text-white hover:bg-mint/10 flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span className="hidden md:inline">Home</span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchSuggestions={searchSuggestions}
              />
              <FilterToggle 
                showFilters={showFilters}
                toggleFilters={toggleFilters}
              />
            </div>
            
            <FilterPanel showFilters={showFilters} />
            
            <CourseTabsSection />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              <EmptyCoursesState />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNavBar />
    </div>
  );
};

export default Marketplace;
