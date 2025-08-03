
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { Link } from 'react-router-dom';

interface Achievement {
  type: "beginner" | "intermediate" | "advanced" | "expert" | "master" | "legend";
  title: string;
  description: string;
  earned: boolean;
}

interface AchievementsCardProps {
  achievements: Achievement[];
}

const AchievementsCard = ({ achievements }: AchievementsCardProps) => {
  const earnedAchievements = achievements.filter(achievement => achievement.earned);
  const totalAchievements = achievements.length;

  if (achievements.length === 0) {
    return (
      <Card className="bg-forest-light border border-mint/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Achievements</h3>
          <span className="text-mint text-sm">0/0</span>
        </div>
        
        <div className="text-center py-8">
          <Award className="h-12 w-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 mb-4">No achievements yet</p>
        </div>
        
        <Link to="/achievements">
          <Button variant="outline" className="w-full border-mint/20 text-mint hover:bg-mint/10">
            View All Achievements
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="bg-forest-light border border-mint/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Achievements</h3>
        <span className="text-mint text-sm">
          {earnedAchievements.length}/{totalAchievements}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {achievements.slice(0, 4).map((achievement, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              achievement.earned ? "bg-mint/20" : "bg-white/5"
            }`}>
              <Award className={`w-6 h-6 ${
                achievement.earned ? "text-mint" : "text-white/40"
              }`} />
            </div>
            <span className="text-xs text-white/60 text-center">{achievement.title}</span>
          </div>
        ))}
      </div>
      
      <Link to="/achievements">
        <Button variant="outline" className="w-full border-mint/20 text-mint hover:bg-mint/10">
          View All Achievements
        </Button>
      </Link>
    </Card>
  );
};

export default AchievementsCard;
