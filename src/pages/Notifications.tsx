import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { MessageSquare, CheckCheck, Trash2, Filter } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import VerifiedBadge from "@/components/profile/VerifiedBadge";
import { toast } from "sonner";
interface Notification {
  id: string;
  type: "message" | "mention" | "follow" | "like" | "comment" | "verification" | "system";
  title: string;
  description: string;
  time: string;
  read: boolean;
  user?: {
    id: string;
    name: string;
    avatar?: string;
    verificationStatus: "unverified" | "pending" | "verified";
  };
  link?: string;
}
const mockNotifications: Notification[] = [{
  id: "1",
  type: "message",
  title: "New message received",
  description: "Sarah Johnson sent you a message",
  time: "5 minutes ago",
  read: false,
  user: {
    id: "1",
    name: "Sarah Johnson",
    verificationStatus: "verified"
  },
  link: "/messages"
}, {
  id: "2",
  type: "follow",
  title: "New follower",
  description: "Michael Chen is now following you",
  time: "2 hours ago",
  read: false,
  user: {
    id: "2",
    name: "Michael Chen",
    verificationStatus: "verified"
  },
  link: "/profile/2"
}, {
  id: "3",
  type: "verification",
  title: "Account verification",
  description: "Your account verification is in progress",
  time: "1 day ago",
  read: true,
  link: "/settings"
}, {
  id: "4",
  type: "system",
  title: "Welcome to Skill Nexus",
  description: "Thank you for joining our platform",
  time: "2 days ago",
  read: true
}];
const NotificationItem = ({
  notification,
  onMarkAsRead,
  onDelete
}: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  return <div className={`p-4 border-b border-white/10 ${notification.read ? 'opacity-70' : ''}`}>
      <div className="flex items-start gap-3">
        {notification.user ? <Avatar className="h-10 w-10">
            {notification.user.avatar ? <AvatarImage src={notification.user.avatar} alt={notification.user.name} /> : <AvatarFallback className="bg-forest text-white">
                {notification.user.name.charAt(0)}
              </AvatarFallback>}
          </Avatar> : <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-mint" />
          </div>}
        
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium text-white flex items-center gap-1">
              {notification.title}
              {notification.user?.verificationStatus === "verified" && <VerifiedBadge size="sm" />}
              {!notification.read && <span className="w-2 h-2 bg-mint rounded-full ml-1"></span>}
            </h3>
            <span className="text-xs text-white/50">{notification.time}</span>
          </div>
          
          <p className="text-sm text-white/70 mt-1">{notification.description}</p>
          
          <div className="flex gap-3 mt-3">
            {notification.link && <Link to={notification.link}>
                <Button variant="outline" size="sm" className="h-8 px-3 text-xs border-mint/20 text-mint hover:bg-mint/10">
                  View
                </Button>
              </Link>}
            
            {!notification.read && <Button variant="ghost" size="sm" className="h-8 px-3 text-xs text-white/70 hover:bg-white/5" onClick={() => onMarkAsRead(notification.id)}>
                <CheckCheck className="h-3.5 w-3.5 mr-1" />
                Mark as read
              </Button>}
            
            <Button variant="ghost" size="sm" className="h-8 px-3 text-xs text-white/70 hover:bg-white/5 ml-auto" onClick={() => onDelete(notification.id)}>
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const {
    user
  } = useAuth();
  if (!user) {
    return <>
        <Navbar />
        <div className="container mx-auto pt-24 pb-16 px-4">
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <MessageSquare className="h-12 w-12 text-white/30 mb-4" />
            <h2 className="text-white text-xl font-medium">Sign in to view your notifications</h2>
            <p className="text-white/70 mt-2">Create an account or sign in to see your notifications</p>
            <div className="flex gap-3 mt-6">
              <Link to="/auth/sign-in">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/sign-up">
                <Button className="bg-white/20 hover:bg-white/30 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>;
  }
  const filteredNotifications = filter === "unread" ? notifications.filter(n => !n.read) : notifications;
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? {
      ...n,
      read: true
    } : n));
    toast.success("Notification marked as read");
  };
  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notification deleted");
  };
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({
      ...n,
      read: true
    })));
    toast.success("All notifications marked as read");
  };
  return <>
      <Navbar />
      <div className="container mx-auto pt-24 pb-16 px-4 bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Notifications
            </h1>
            
            <div className="flex gap-2">
              <Button variant="ghost" className="text-white/70 hover:bg-white/5" onClick={() => setFilter(filter === "all" ? "unread" : "all")}>
                <Filter className="h-4 w-4 mr-2" />
                {filter === "all" ? "All" : "Unread"}
              </Button>
              
              <Button variant="outline" className="border-mint/20 text-mint hover:bg-mint/10" onClick={handleMarkAllAsRead} disabled={notifications.every(n => n.read)}>
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            </div>
          </div>
          
          <div className="bg-forest-light border border-mint/10 rounded-lg overflow-hidden">
            {filteredNotifications.length > 0 ? filteredNotifications.map(notification => <NotificationItem key={notification.id} notification={notification} onMarkAsRead={handleMarkAsRead} onDelete={handleDelete} />) : <div className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium">
                  {filter === "unread" ? "No unread notifications" : "No notifications yet"}
                </h3>
                <p className="text-white/70 mt-2">
                  {filter === "unread" ? "You've read all your notifications" : "When you receive notifications, they'll appear here"}
                </p>
                {filter === "unread" && notifications.length > 0 && <Button className="mt-4 bg-mint hover:bg-mint/90 text-forest" onClick={() => setFilter("all")}>
                    View all notifications
                  </Button>}
              </div>}
          </div>
        </div>
      </div>
    </>;
};
export default Notifications;