
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanType } from "@/components/pricing/types";
import { useNavigate } from "react-router-dom";
import { Crown } from "lucide-react";

interface UserPlan {
  name: PlanType;
  expires: string;
  features: string[];
}

interface UserPlanCardProps {
  plan: UserPlan;
}

const UserPlanCard = ({ plan }: UserPlanCardProps) => {
  const navigate = useNavigate();
  const isPremium = plan.name !== "Free";
  const planColor = getPlanColor(plan.name);
  
  function getPlanColor(planName: PlanType): string {
    switch(planName) {
      case "Free": return "text-white/60";
      case "Lite": return "text-blue-400";
      case "Pro Learner": return "text-mint";
      case "Educator": return "text-primary-purple";
      default: return "text-white";
    }
  }
  
  const handlePlanAction = () => {
    navigate('/pricing');
  };
  
  if (plan.features.length === 0) {
    return (
      <Card className="bg-dark-purple border border-primary-purple/10 p-6">
        <h3 className="text-xl font-bold mb-4 text-white">
          Current Plan: <span className={planColor}>{plan.name}</span>
        </h3>
        <div className="text-center py-8">
          <Crown className="h-12 w-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 mb-4">Ready to unlock premium features?</p>
        </div>
        <Button 
          className="w-full bg-primary-purple hover:bg-primary-purple/90 text-white"
          onClick={handlePlanAction}
        >
          {isPremium ? "Manage Subscription" : "Upgrade Now"}
        </Button>
      </Card>
    );
  }
  
  return (
    <Card className="bg-dark-purple border border-primary-purple/10 p-6">
      <h3 className="text-xl font-bold mb-4 text-white">
        Current Plan: <span className={planColor}>{plan.name}</span>
      </h3>
      <div className="space-y-2 mb-4">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isPremium ? planColor.replace('text-', 'bg-') : 'bg-white/40'}`}></div>
            <p className={`${isPremium ? 'text-white' : 'text-white/60'}`}>{feature}</p>
          </div>
        ))}
      </div>
      <div className="text-sm text-white/60 mb-4">
        Expires: {plan.expires}
      </div>
      <Button 
        className="w-full bg-primary-purple hover:bg-primary-purple/90 text-white"
        onClick={handlePlanAction}
      >
        {isPremium ? "Manage Subscription" : "Upgrade Now"}
      </Button>
    </Card>
  );
};

export default UserPlanCard;
