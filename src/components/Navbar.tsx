import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Bell, User as UserIcon, Menu, X, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import VerifiedBadge from "./profile/VerifiedBadge";
import { toast } from "sonner";
import UserSearch from "./UserSearch";
import NotificationDropdown from "./notifications/NotificationDropdown";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";
import HomeButton from "./HomeButton";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [secureNavigation, setSecureNavigation] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showShine, setShowShine] = useState(false);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const isVerified = user?.verificationStatus === "verified";
  const location = useLocation();
  const { visible } = useScrollNavigation();

  // Trigger shine animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowShine(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNotificationsClick = () => {
    if (user) {
      setIsNotificationOpen(!isNotificationOpen);
    } else {
      toast.info("Please sign in to view notifications");
    }
  };

  const toggleSecureNavigation = () => {
    setSecureNavigation(!secureNavigation);
    toast.success(secureNavigation ? "Standard navigation mode enabled" : "Secure navigation mode enabled");
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[70] transition-all duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? "bg-gray-900/95 backdrop-blur-lg shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto md:py-4 bg-transparent backdrop-blur-xl px-[16px] py-px">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <HomeButton />
          </div>
          
          <div className="flex items-center space-x-3">
            <button onClick={toggleSecureNavigation} className="p-2 rounded-full hover:bg-white/5 transition-colors relative hidden md:flex" aria-label={secureNavigation ? "Disable secure navigation" : "Enable secure navigation"} title={secureNavigation ? "Secure navigation active" : "Standard navigation"}>
              <Shield className={`h-5 w-5 ${secureNavigation ? "text-green-400" : "text-white/60"}`} />
            </button>

            {/* User Search Component */}
            <UserSearch />
            
            {user ? (
              <>
                <div className="relative">
                  <button ref={notificationButtonRef} onClick={handleNotificationsClick} className="p-1 md:p-2 rounded-full hover:bg-white/5 transition-colors relative">
                    <Bell className="h-4 w-4 md:h-5 md:w-5 text-white" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  
                  <NotificationDropdown isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} triggerRef={notificationButtonRef} />
                </div>
                
                <Link to="/profile" className="flex items-center p-1 rounded-full hover:bg-white/5 transition-colors">
                  <div className="relative">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-lg font-semibold">
                      {user.name?.[0] || user.email?.[0] || <UserIcon className="h-4 w-4 md:h-5 md:w-5" />}
                    </div>
                    {isVerified && <VerifiedBadge className="absolute -bottom-1 -right-1" />}
                  </div>
                </Link>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/auth/sign-in">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/sign-up">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1 md:p-2 rounded-full hover:bg-white/5 transition-colors md:hidden">
              {isMobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-white/10 mt-2 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <span className="mx-0 text-base font-normal text-slate-50">Secure Navigation</span>
                <button onClick={toggleSecureNavigation} className="p-2 rounded-full hover:bg-white/5 transition-colors relative">
                  <Shield className={`h-5 w-5 ${secureNavigation ? "text-green-400" : "text-white/60"}`} />
                </button>
              </div>
              
              {!user && (
                <div className="flex space-x-2 mt-2">
                  <Link to="/auth/sign-in" className="flex-1">
                    <Button variant="outline" className="w-full border-white/30 hover:bg-white/10 text-base text-white">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth/sign-up" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
