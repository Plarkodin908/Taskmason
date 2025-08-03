
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

interface ActivityItem {
  id: number;
  type: string;
  title: string;
  time: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  if (activities.length === 0) {
    return (
      <Card className="bg-forest-light border border-mint/10 p-6">
        <div className="text-center py-12">
          <Activity className="h-12 w-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Recent Activity</h3>
          <p className="text-white/60 mb-4">Your activity will appear here as you engage with the platform.</p>
        </div>
        <Button 
          variant="outline" 
          className="mt-4 border-mint/20 text-mint hover:bg-mint/10 w-full" 
          onClick={() => window.location.href = "/activity"}
        >
          View All Activity
        </Button>
      </Card>
    );
  }

  return (
    <Card className="bg-forest-light border border-mint/10 p-6">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border-l-2 border-mint pl-4 pb-4">
            <p className="text-white font-medium">{activity.title}</p>
            <p className="text-white/60 text-sm">{activity.time}</p>
          </div>
        ))}
      </div>
      <Button 
        variant="outline" 
        className="mt-4 border-mint/20 text-mint hover:bg-mint/10 w-full" 
        onClick={() => window.location.href = "/activity"}
      >
        View All Activity
      </Button>
    </Card>
  );
};

export default ActivityFeed;
