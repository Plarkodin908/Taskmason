
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import UserStatsCard from "@/components/dashboard/UserStatsCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import AchievementsCard from "@/components/dashboard/AchievementsCard";
import UserPlanCard from "@/components/dashboard/UserPlanCard";
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  Award,
  Calendar,
  BarChart
} from "lucide-react";

const Dashboard = () => {
  // All data starts empty - no sample data
  const userStats = [];
  const recentActivity = [];
  const userAchievements = [];
  
  const userPlan = {
    name: "Free" as const,
    expires: "Never",
    features: []
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={BookOpen}
          title="Browse Courses"
          description="Discover new learning opportunities"
          buttonText="Explore Marketplace"
          href="/marketplace"
        />
        
        <StatCard
          icon={Users}
          title="Connect with Others"
          description="Find learning partners and mentors"
          buttonText="Find Matches"
          href="/matches"
        />
        
        <StatCard
          icon={MessageSquare}
          title="Start Conversations"
          description="Connect with your learning community"
          buttonText="Open Messages"
          href="/messages"
        />
        
        <StatCard
          icon={Award}
          title="Track Achievements"
          description="Monitor your learning progress"
          buttonText="View Achievements"
          href="/achievements"
        />
        
        <StatCard
          icon={Calendar}
          title="Plan Your Learning"
          description="Schedule your study sessions"
          buttonText="Open Calendar"
          href="/calendar"
        />
        
        <StatCard
          icon={BarChart}
          title="View Analytics"
          description="Track your learning analytics"
          buttonText="See Activity"
          href="/activity"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <UserStatsCard stats={userStats} />
          <ActivityFeed activities={recentActivity} />
        </div>
        
        <div className="space-y-6">
          <AchievementsCard achievements={userAchievements} />
          <UserPlanCard plan={userPlan} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
