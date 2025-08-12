
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UserStatsCard from "@/components/dashboard/UserStatsCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import UserPlanCard from "@/components/dashboard/UserPlanCard";
import AchievementsCard from "@/components/dashboard/AchievementsCard";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Empty data to show empty states
  const emptyStats = [];
  const emptyActivities = [];
  const defaultPlan = {
    name: "Free" as const,
    expires: "Never",
    features: []
  };
  const emptyAchievements = [];

  return (
    <DashboardLayout sidebar={null}>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's your learning progress overview
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <UserStatsCard stats={emptyStats} />
            <ActivityFeed activities={emptyActivities} />
          </div>
          <div className="space-y-6">
            <UserPlanCard plan={defaultPlan} />
            <AchievementsCard achievements={emptyAchievements} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
