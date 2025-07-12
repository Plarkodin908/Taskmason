
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity as ActivityIcon, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Award, 
  Calendar,
  TrendingUp,
  Clock,
  Target
} from "lucide-react";
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";

const Activity = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedType, setSelectedType] = useState("all");

  const activities = [
    {
      id: 1,
      type: "learning",
      title: "Completed JavaScript Fundamentals",
      description: "Finished all 12 lessons and passed the final quiz",
      timestamp: "2 hours ago",
      icon: BookOpen,
      points: 150
    },
    {
      id: 2,
      type: "social",
      title: "Connected with Sarah Johnson",
      description: "New connection in React development",
      timestamp: "5 hours ago",
      icon: Users,
      points: 25
    },
    {
      id: 3,
      type: "achievement",
      title: "Earned 'Coding Streak' badge",
      description: "Maintained 7-day learning streak",
      timestamp: "Yesterday",
      icon: Award,
      points: 200
    },
    {
      id: 4,
      type: "discussion",
      title: "Answered question in React forum",
      description: "Helped with state management issue",
      timestamp: "Yesterday",
      icon: MessageSquare,
      points: 50
    },
    {
      id: 5,
      type: "learning",
      title: "Started Advanced React Course",
      description: "Enrolled in advanced hooks and patterns",
      timestamp: "2 days ago",
      icon: BookOpen,
      points: 0
    },
    {
      id: 6,
      type: "session",
      title: "Mentoring Session with Alex",
      description: "1-hour portfolio review session",
      timestamp: "3 days ago",
      icon: Calendar,
      points: 100
    }
  ];

  const stats = [
    { label: "Total Points", value: "2,485", icon: Target, change: "+12%" },
    { label: "Courses Completed", value: "18", icon: BookOpen, change: "+3" },
    { label: "Connections Made", value: "34", icon: Users, change: "+5" },
    { label: "Hours Learned", value: "127", icon: Clock, change: "+8h" }
  ];

  const periods = [
    { id: "day", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "all", label: "All Time" }
  ];

  const activityTypes = [
    { id: "all", label: "All Activity" },
    { id: "learning", label: "Learning" },
    { id: "social", label: "Social" },
    { id: "achievement", label: "Achievements" },
    { id: "discussion", label: "Discussions" },
    { id: "session", label: "Sessions" }
  ];

  const filteredActivities = selectedType === "all" 
    ? activities 
    : activities.filter(a => a.type === selectedType);

  const getTypeColor = (type: string) => {
    const colors = {
      learning: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      social: "bg-green-500/10 text-green-400 border-green-500/20",
      achievement: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      discussion: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      session: "bg-mint/10 text-mint border-mint/20"
    };
    return colors[type as keyof typeof colors] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  return (
    <RefinedPageLayout title="Activity Dashboard" backUrl="/dashboard">
      <div className="max-w-6xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-forest-light border border-mint/10 p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-8 w-8 text-mint" />
                <Badge variant="outline" className="border-mint/20 text-mint">
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="bg-forest-light border border-mint/10 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-white font-medium mb-3">Time Period</h3>
              <div className="flex flex-wrap gap-2">
                {periods.map(period => (
                  <Button
                    key={period.id}
                    variant={selectedPeriod === period.id ? "default" : "outline"}
                    size="sm"
                    className={`${
                      selectedPeriod === period.id
                        ? "bg-mint hover:bg-mint/90 text-forest"
                        : "border-mint/20 text-white hover:bg-mint/10"
                    } hover-scale`}
                    onClick={() => setSelectedPeriod(period.id)}
                  >
                    {period.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-white font-medium mb-3">Activity Type</h3>
              <div className="flex flex-wrap gap-2">
                {activityTypes.map(type => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "outline"}
                    size="sm"
                    className={`${
                      selectedType === type.id
                        ? "bg-mint hover:bg-mint/90 text-forest"
                        : "border-mint/20 text-white hover:bg-mint/10"
                    } hover-scale`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="bg-forest-light border border-mint/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <ActivityIcon className="h-6 w-6 text-mint" />
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <Badge variant="outline" className="border-mint/20 text-mint">
              {filteredActivities.length} activities
            </Badge>
          </div>

          <div className="space-y-4">
            {filteredActivities.map(activity => (
              <div 
                key={activity.id}
                className="flex items-start gap-4 p-4 bg-forest rounded-lg border border-mint/10 hover:border-mint/30 transition-all"
              >
                <div className="p-2 rounded-full bg-mint/10">
                  <activity.icon className="h-5 w-5 text-mint" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white">{activity.title}</h3>
                    <div className="flex items-center gap-2">
                      {activity.points > 0 && (
                        <Badge className="bg-mint/10 text-mint border-mint/20">
                          +{activity.points} pts
                        </Badge>
                      )}
                      <Badge 
                        variant="outline"
                        className={getTypeColor(activity.type)}
                      >
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-2">{activity.description}</p>
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline"
              className="border-mint/20 text-mint hover:bg-mint/10 hover-scale"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              View Detailed Analytics
            </Button>
          </div>
        </Card>
      </div>
    </RefinedPageLayout>
  );
};

export default Activity;
