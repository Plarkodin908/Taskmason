
import { useState, useRef, useEffect } from "react";
import { Bell, Check, X, Eye, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "task" | "payment" | "learning";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionText?: string;
  actionLink?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "task",
    title: "Gig Accepted",
    message: "Your web development gig has been accepted by client Sarah",
    timestamp: "Just now",
    isRead: false,
    actionText: "View Details",
    actionLink: "/gigs/123"
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    message: "You've received $150 for completing the React tutorial",
    timestamp: "2 hours ago",
    isRead: false,
    actionText: "View Transaction",
    actionLink: "/payments/456"
  },
  {
    id: "3",
    type: "learning",
    title: "New Course Available",
    message: "Advanced JavaScript Patterns course is now available",
    timestamp: "1 day ago",
    isRead: true,
    actionText: "Start Learning",
    actionLink: "/courses/789"
  },
  {
    id: "4",
    type: "task",
    title: "Tutorial Uploaded",
    message: "Your Python basics tutorial has been successfully uploaded",
    timestamp: "2 days ago",
    isRead: true,
    actionText: "View Tutorial",
    actionLink: "/tutorials/101"
  },
  {
    id: "5",
    type: "learning",
    title: "Learning Reminder",
    message: "You have 3 unread tutorials in your learning queue",
    timestamp: "3 days ago",
    isRead: false,
    actionText: "View Queue",
    actionLink: "/learning-queue"
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "task":
      return "🎯";
    case "payment":
      return "💰";
    case "learning":
      return "📚";
    default:
      return "🔔";
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "task":
      return "bg-blue-500/10 text-blue-400";
    case "payment":
      return "bg-green-500/10 text-green-400";
    case "learning":
      return "bg-purple-500/10 text-purple-400";
    default:
      return "bg-gray-500/10 text-gray-400";
  }
};

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const NotificationDropdown = ({ isOpen, onClose, triggerRef }: NotificationDropdownProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "absolute top-full right-0 mt-2 w-96 max-w-[90vw] bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50",
        "animate-in fade-in-0 slide-in-from-top-2 duration-200"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs text-gray-400 hover:text-white"
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={cn(
                "p-4 border-b border-gray-700/50 hover:bg-gray-800/50 transition-colors",
                "animate-in fade-in-0 slide-in-from-left-1 duration-300",
                !notification.isRead && "bg-gray-800/30"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm flex-shrink-0",
                  getNotificationColor(notification.type)
                )}>
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className={cn(
                        "text-sm font-medium truncate",
                        notification.isRead ? "text-gray-300" : "text-white"
                      )}>
                        {notification.title}
                        {!notification.isRead && (
                          <span className="inline-block w-2 h-2 bg-purple-500 rounded-full ml-2 animate-pulse" />
                        )}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-gray-400 hover:text-white p-1 h-auto"
                          title="Mark as read"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(notification.id)}
                        className="text-gray-400 hover:text-red-400 p-1 h-auto"
                        title="Remove"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {notification.timestamp}
                    </span>
                    {notification.actionText && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-purple-400 hover:text-purple-300 h-auto p-1"
                        onClick={() => {
                          // Handle navigation
                          console.log(`Navigate to: ${notification.actionLink}`);
                          markAsRead(notification.id);
                          onClose();
                        }}
                      >
                        {notification.actionText}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-gray-700 bg-gray-800/50">
          <Button
            variant="ghost"
            className="w-full text-sm text-gray-400 hover:text-white"
            onClick={() => {
              // Navigate to full notifications page
              console.log("Navigate to /notifications");
              onClose();
            }}
          >
            View all notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
