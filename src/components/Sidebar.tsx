
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  ShoppingBag, 
  MessageSquare, 
  BookOpen, 
  Users,
  User,
  Settings,
  Menu,
  X,
  GraduationCap
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/marketplace", label: "Course Marketplace", icon: ShoppingBag },
    { path: "/messages", label: "Messages", icon: MessageSquare },
    { path: "/tutorials", label: "Tutorials & Resources", icon: BookOpen },
    { path: "/community", label: "Community", icon: Users },
    { path: "/dashboard", label: "My Learning", icon: GraduationCap },
  ];
  
  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden border-mint/20 text-mint hover:bg-mint/10"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      
      {/* Sidebar */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-forest-light border-r border-mint/10 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-screen
        `}
      >
        <div className="flex flex-col h-full p-5">
          <div className="flex items-center justify-center mb-8">
            <Link to="/" className="flex flex-col items-center hover:opacity-90 transition-opacity" onClick={scrollToTop}>
              <img 
                src="/lovable-uploads/new-logo.png" 
                alt="Taskmason Logo" 
                className="h-16 w-auto hover-scale transition-transform"
              />
              <h1 className="text-lg font-bold text-mint mt-2">TASKMASON</h1>
            </Link>
          </div>
          
          <nav className="flex-grow">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-mint text-forest font-medium translate-x-1' 
                          : 'text-white/80 hover:bg-mint/10 hover:text-mint hover:translate-x-1'}
                      `}
                      onClick={scrollToTop}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <Separator className="bg-mint/10 my-4" />
          
          <Link 
            to="/settings" 
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
              ${location.pathname === "/settings" 
                ? 'bg-mint text-forest font-medium translate-x-1' 
                : 'text-white/80 hover:bg-mint/10 hover:text-mint hover:translate-x-1'}
            `}
            onClick={scrollToTop}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
          
          <div className="mt-4 bg-forest p-4 rounded-lg border border-mint/10">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-mint/20 flex items-center justify-center mb-2">
                <User className="h-6 w-6 text-mint" />
              </div>
              <p className="text-white font-medium">John Doe</p>
              <p className="text-white/60 text-sm">Educator</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 border-mint/20 text-mint hover:bg-mint/10 text-xs hover-scale"
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
