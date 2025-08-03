
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star, Target, Crown, Medal, Zap, Heart } from "lucide-react";
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Empty achievements array
  const achievements: any[] = [];

  const categories = [
    { id: "all", label: "All Achievements", count: 0 },
    { id: "learning", label: "Learning", count: 0 },
    { id: "social", label: "Social", count: 0 },
    { id: "teaching", label: "Teaching", count: 0 },
    { id: "community", label: "Community", count: 0 },
    { id: "consistency", label: "Consistency", count: 0 }
  ];

  const filteredAchievements = achievements;
  const earnedCount = 0;

  return (
    <RefinedPageLayout title="Achievements" backUrl="/dashboard">
      <div className="max-w-6xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-forest-light border border-mint/10 p-6 text-center">
            <Trophy className="h-8 w-8 text-mint mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-white/70">Earned</div>
          </Card>
          <Card className="bg-forest-light border border-mint/10 p-6 text-center">
            <Target className="h-8 w-8 text-mint mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-white/70">In Progress</div>
          </Card>
          <Card className="bg-forest-light border border-mint/10 p-6 text-center">
            <Award className="h-8 w-8 text-mint mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">0%</div>
            <div className="text-white/70">Complete</div>
          </Card>
        </div>

        {/* Category Filter */}
        <Card className="bg-forest-light border border-mint/10 p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`${
                  selectedCategory === category.id
                    ? "bg-mint hover:bg-mint/90 text-forest"
                    : "border-mint/20 text-white hover:bg-mint/10"
                } hover-scale`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </Card>

        {/* Empty State */}
        <div className="text-center py-20">
          <Award className="h-16 w-16 text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Achievements Yet</h2>
          <p className="text-white/60 mb-6">
            Start your learning journey to unlock achievements and earn badges.
          </p>
          <Button className="bg-mint hover:bg-mint/90 text-forest hover-scale">
            Start Learning
          </Button>
        </div>
      </div>
    </RefinedPageLayout>
  );
};

export default Achievements;
