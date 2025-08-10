import { Link, useLocation } from "react-router-dom";
import { Home, Search, MessageSquare, BookOpen, User, Settings } from "lucide-react";
const SkillSidebar = () => {
  const location = useLocation();
  const sidebarItems = [{
    icon: <Home className="h-5 w-5" />,
    label: "Home",
    path: "/"
  }, {
    icon: <Search className="h-5 w-5" />,
    label: "Explore",
    path: "/marketplace"
  }, {
    icon: <BookOpen className="h-5 w-5" />,
    label: "Courses",
    path: "/tutorials"
  }, {
    icon: <MessageSquare className="h-5 w-5" />,
    label: "Messages",
    path: "/messages"
  }, {
    icon: <User className="h-5 w-5" />,
    label: "Profile",
    path: "/profile"
  }, {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    path: "/settings"
  }];
  return <div className="skill-sidebar hidden lg:block">
      <div className="flex flex-col items-center pb-6 pt-4">
        
      </div>
      <div className="flex flex-col">
        {sidebarItems.map(item => <Link key={item.path} to={item.path} className={`sidebar-item flex items-center gap-3 px-4 py-3 ${location.pathname === item.path ? 'active bg-gray-800/50 border-l-2 border-primary-purple' : ''}`}>
            <span className="text-gray-400">{item.icon}</span>
            <span className="text-gray-200">{item.label}</span>
          </Link>)}
      </div>
    </div>;
};
export default SkillSidebar;