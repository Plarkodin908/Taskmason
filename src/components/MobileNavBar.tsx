import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, BookOpen, ShoppingBag, User, CreditCard, Bell, Settings, MessageCircle, Shield, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import GeminiChat from "@/components/chat/GeminiChat";
import { toast } from "sonner";
import UserSearch from "@/components/UserSearch";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import { useRef } from "react";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [secureNavigation, setSecureNavigation] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const { user } = useAuth();
  const location = useLocation();
  const { visible } = useScrollNavigation();

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleSecureNavigation = () => {
    setSecureNavigation(!secureNavigation);
    toast.success(secureNavigation ? "Standard navigation mode enabled" : "Secure navigation mode enabled");
  };
  const handleNotificationsClick = () => {
    if (user) {
      setIsNotificationOpen(!isNotificationOpen);
    } else {
      toast.info("Please sign in to view notifications");
    }
  };

  // Only show on mobile devices
  if (!isMobile) {
    return null;
  }
  
  return (
    <>
      <div className={`fixed bottom-0 left-0 right-0 z-[60] transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
        {isOpen && (
          <div className="bg-black/95 backdrop-blur-md border-t border-white/10 p-4 rounded-t-2xl shadow-2xl animate-slide-in-up">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-white text-lg">Navigation Menu</p>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={toggleMenu} aria-label="Close menu">
                <X className="h-5 w-5" strokeWidth={3} />
              </Button>
            </div>
            
            {/* Search Section */}
            <div className="mb-4">
              <p className="text-xs text-white/60 mb-2">Search Users</p>
              <UserSearch />
            </div>

            {/* Security Toggle */}
            <div className="flex items-center justify-between mb-4 p-3 bg-black/40 rounded-lg">
              <span className="text-white font-medium">Secure Navigation</span>
              <button onClick={toggleSecureNavigation} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <Shield className={`h-5 w-5 ${secureNavigation ? "text-green-400" : "text-gray-400"}`} />
              </button>
            </div>

            {/* Notifications */}
            {user && (
              <div className="mb-4">
                <div className="relative">
                  <NotificationDropdown isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} triggerRef={notificationButtonRef} />
                </div>
              </div>
            )}
            
            {/* Main Navigation Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Link to="/tutorials" className="flex items-center gap-3 p-3 rounded-lg bg-black/40 hover:bg-white/10 text-white transition-colors" onClick={toggleMenu}>
                <BookOpen className="h-5 w-5" strokeWidth={2} />
                <span>Tutorials</span>
              </Link>
              <Link to="/marketplace" className="flex items-center gap-3 p-3 rounded-lg bg-black/40 hover:bg-white/10 text-white transition-colors" onClick={toggleMenu}>
                <ShoppingBag className="h-5 w-5" strokeWidth={2} />
                <span>Marketplace</span>
              </Link>
              <Link to="/settings" className="flex items-center gap-3 p-3 rounded-lg bg-black/40 hover:bg-white/10 text-white transition-colors" onClick={toggleMenu}>
                <Settings className="h-5 w-5" strokeWidth={2} />
                <span>Settings</span>
              </Link>
              <Link to="/pricing" className="flex items-center gap-3 p-3 rounded-lg bg-black/40 hover:bg-white/10 text-white transition-colors" onClick={toggleMenu}>
                <CreditCard className="h-5 w-5" strokeWidth={2} />
                <span>Pricing</span>
              </Link>
            </div>
            
            {/* Account Section */}
            <div className="pt-3 border-t border-white/10">
              <p className="text-xs text-white/60 mb-3">Your Account</p>
              {user ? (
                <div className="flex items-center gap-3 p-3 bg-black/40 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user.name?.[0] || user.email?.[0] || <User className="h-5 w-5" />}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{user.name || "User"}</p>
                    <p className="text-white/60 text-sm">{user.membership || "Free Plan"}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/auth/sign-in" className="flex-1">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth/sign-up" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Bottom Navigation Bar */}
        <div className="flex justify-around items-center bg-black/95 backdrop-blur-md border-t border-white/10 p-2 shadow-2xl">
          <Link to="/" className="p-2 text-white hover:text-indigo-400 flex flex-col items-center transition-colors">
            <Home className="h-5 w-5" strokeWidth={2} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link to="/marketplace" className="p-2 text-white hover:text-indigo-400 flex flex-col items-center transition-colors">
            <ShoppingBag className="h-5 w-5" strokeWidth={2} />
            <span className="text-xs mt-1">Market</span>
          </Link>
          
          <Button onClick={toggleMenu} className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-3 -mt-4 shadow-lg transform hover:scale-105 transition-all duration-200" aria-label="Open menu">
            <Menu strokeWidth={2} className="h-5 w-5" />
          </Button>
          
          <Button onClick={toggleChat} className="p-2 text-white hover:text-indigo-400 flex flex-col items-center bg-transparent hover:bg-transparent transition-colors" aria-label="Open AI chat">
            <MessageCircle className="h-5 w-5" strokeWidth={2} />
            <span className="text-xs mt-1">AI Chat</span>
          </Button>
          
          <Link to="/profile" className="p-2 text-white hover:text-indigo-400 flex flex-col items-center transition-colors">
            <User className="h-5 w-5" strokeWidth={2} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>

      {/* AI Chat Component */}
      {isChatOpen && <GeminiChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default MobileNavBar;
