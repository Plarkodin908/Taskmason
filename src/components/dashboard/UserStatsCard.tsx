
import { Card } from "@/components/ui/card";
import { BarChart } from "lucide-react";

interface StatItem {
  value: string | number;
  label: string;
}

interface UserStatsCardProps {
  stats: StatItem[];
}

const UserStatsCard = ({ stats }: UserStatsCardProps) => {
  if (stats.length === 0) {
    return (
      <Card className="bg-forest-light border border-mint/10 p-6">
        <h3 className="text-xl font-bold mb-4 text-white">Your Stats</h3>
        <div className="text-center py-8">
          <BarChart className="h-12 w-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/60">No stats available yet</p>
          <p className="text-white/40 text-sm">Start learning to see your progress!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-forest-light border border-mint/10 p-6">
      <h3 className="text-xl font-bold mb-4 text-white">Your Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-forest p-4 rounded-lg text-center">
            <p className="text-mint text-3xl font-bold">{stat.value}</p>
            <p className="text-white/70">{stat.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UserStatsCard;
