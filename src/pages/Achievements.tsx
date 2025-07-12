
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star, Target, Crown, Medal, Zap, Heart } from "lucide-react";
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first tutorial",
      icon: Star,
      category: "learning",
      earned: true,
      earnedDate: "2024-01-15",
      rarity: "common"
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Complete 10 different tutorials",
      icon: Trophy,
      category: "learning",
      earned: true,
      earnedDate: "2024-02-20",
      rarity: "uncommon"
    },
    {
      id: 3,
      title: "Social Butterfly",
      description: "Connect with 20 other learners",
      icon: Heart,
      category: "social",
      earned: false,
      progress: 15,
      total: 20,
      rarity: "rare"
    },
    {
      id: 4,
      title: "Streak Master",
      description: "Learn for 30 consecutive days",
      icon: Zap,
      category: "consistency",
      earned: true,
      earnedDate: "2024-03-10",
      rarity: "epic"
    },
    {
      id: 5,
      title: "Master Teacher",
      description: "Create 5 high-rated tutorials",
      icon: Crown,
      category: "teaching",
      earned: false,
      progress: 2,
      total: 5,
      rarity: "legendary"
    },
    {
      id: 6,
      title: "Community Champion",
      description: "Help 50 other learners",
      icon: Medal,
      category: "community",
      earned: false,
      progress: 23,
      total: 50,
      rarity: "epic"
    }
  ];

  const categories = [
    { id: "all", label: "All Achievements", count: achievements.length },
    { id: "learning", label: "Learning", count: achievements.filter(a => a.category === "learning").length },
    { id: "social", label: "Social", count: achievements.filter(a => a.category === "social").length },
    { id: "teaching", label: "Teaching", count: achievements.filter(a => a.category === "teaching").length },
    { id: "community", label: "Community", count: achievements.filter(a => a.category === "community").length },
    { id: "consistency", label: "Consistency", count: achievements.filter(a => a.category === "consistency").length }
  ];

  const filteredAchievements = selectedCategory === "all" 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const earnedCount = achievements.filter(a => a.earned).length;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-400";
      case "uncommon": return "text-green-400";
      case "rare": return "text-blue-400";
      case "epic": return "text-purple-400";
      case "legendary": return "text-orange-400";
      default: return "text-white";
    }
  };

  return (
    <RefinedPageLayout title="Achievements" backUrl="/dashboard">
      <div className="max-w-6xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-forest-light border border-mint/10 p-6 text-center">
            <Trophy className="h-8 w-8 text-mint mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{earnedCount}</div>
            <div className="text-white/70">Earned</div>
          </Card>
          <Card className="bg-forest-light border border-mint/10 p-6 text-center">
            <Target className="h-8 w-8 text-mint mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{achievements.length - earnedCount}</div>
            <div className="text-white/70">In Progress</div>
          </Card>
          <Card className="bg-forest-light border border-mint/10 p-6 text-center">
            <Award className="h-8 w-8 text-mint mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{Math.round((earnedCount / achievements.length) * 100)}%</div>
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

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => (
            <Card 
              key={achievement.id}
              className={`p-6 transition-all hover-scale ${
                achievement.earned
                  ? "bg-forest-light border-mint/30"
                  : "bg-forest-light border-mint/10 opacity-75"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${
                  achievement.earned ? "bg-mint/20" : "bg-white/5"
                }`}>
                  <achievement.icon className={`h-6 w-6 ${
                    achievement.earned ? "text-mint" : "text-white/40"
                  }`} />
                </div>
                <Badge 
                  variant="outline"
                  className={`${getRarityColor(achievement.rarity)} border-current`}
                >
                  {achievement.rarity}
                </Badge>
              </div>

              <h3 className={`text-lg font-bold mb-2 ${
                achievement.earned ? "text-white" : "text-white/60"
              }`}>
                {achievement.title}
              </h3>
              
              <p className="text-white/70 text-sm mb-4">
                {achievement.description}
              </p>

              {achievement.earned ? (
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-mint" />
                  <span className="text-mint text-sm font-medium">
                    Earned on {new Date(achievement.earnedDate!).toLocaleDateString()}
                  </span>
                </div>
              ) : achievement.progress !== undefined ? (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Progress</span>
                    <span className="text-white">{achievement.progress}/{achievement.total}</span>
                  </div>
                  <div className="w-full bg-forest rounded-full h-2">
                    <div 
                      className="bg-mint h-2 rounded-full transition-all"
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-white/50 text-sm">
                  Requirements not met
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </RefinedPageLayout>
  );
};

export default Achievements;
