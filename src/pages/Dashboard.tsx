
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";

// Import components
import UserStatsCard from "@/components/dashboard/UserStatsCard";
import AchievementsCard from "@/components/dashboard/AchievementsCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import UserPlanCard from "@/components/dashboard/UserPlanCard";
import StatCard from "@/components/dashboard/StatCard";
import { PlanType } from "@/components/pricing/types";

// Define types for our data structures
type UserStat = {
  value: number | string;
  label: string;
};

type Activity = {
  id: number;
  type: string;
  title: string;
  time: string;
};

type Achievement = {
  type: "beginner" | "intermediate" | "advanced" | "expert" | "master" | "legend";
  title: string;
  description: string;
  earned: boolean;
};

type UserPlan = {
  name: PlanType;
  expires: string;
  features: string[];
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Empty data arrays
  const stats: UserStat[] = [];
  const activities: Activity[] = [];
  const achievements: Achievement[] = [];

  // Basic user plan data
  const userPlan: UserPlan = {
    name: "Free",
    expires: "No expiration",
    features: []
  };

  const handleShareProgress = () => {
    toast.success("Progress shared to your network!");
  };

  return (
    <RefinedPageLayout title="Dashboard" backUrl="/">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard
                icon={BookOpen}
                title="Learning Path"
                description="Continue your personalized learning journey."
                buttonText="Resume Learning"
                href="/tutorials"
              />
              <StatCard
                icon={Users}
                title="Skill Exchange"
                description="Connect with others to share your knowledge."
                buttonText="Find Matches"
                href="/matches"
              />
            </div>

            <div className="card-container">
              <h2 className="text-xl text-white mb-4">Recent Activity</h2>
              <ActivityFeed activities={activities} />
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  className="text-mint border-mint/20 hover:bg-mint/10"
                  onClick={handleShareProgress}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Share Progress
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Achievements</h2>
              <Link to="/achievements">
                <Button
                  variant="outline"
                  className="text-mint border-mint/20 hover:bg-mint/10"
                >
                  <Award className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </Link>
            </div>

            {achievements.length === 0 ? (
              <div className="text-center py-20">
                <Award className="h-16 w-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Achievements Yet</h3>
                <p className="text-white/60">Start learning to unlock your first achievement!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`border border-mint/10 bg-forest-light p-4 text-center rounded-lg ${
                      achievement.earned ? "border-mint/30" : "opacity-60"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center badge-${achievement.type}`}
                    >
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white">{achievement.title}</h3>
                    <p className="text-sm text-white/60">{achievement.description}</p>
                    {achievement.earned && (
                      <span className="inline-block mt-2 px-2 py-1 bg-mint/10 text-mint text-xs rounded-full">
                        Earned
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-8">
          <UserStatsCard stats={stats} />
          <UserPlanCard plan={userPlan} />
          <AchievementsCard achievements={achievements} />
        </div>
      </div>
    </RefinedPageLayout>
  );
};

export default Dashboard;
