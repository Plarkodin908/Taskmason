
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star, Crown } from "lucide-react";
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";

const PlanDetails = () => {
  const { planId } = useParams<{ planId: string }>();
  
  // Sample plan data - in a real app, this would come from an API
  const planData = {
    free: {
      name: "Free Plan",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with skill sharing",
      features: [
        "Access to basic tutorials",
        "Up to 3 social links",
        "Basic community access",
        "Limited messaging"
      ],
      color: "mint"
    },
    lite: {
      name: "Lite Learner",
      price: "$9.99",
      period: "per month",
      description: "Enhanced learning experience with premium features",
      features: [
        "Unlimited tutorial access",
        "Priority matching",
        "Advanced messaging",
        "Up to 10 social links",
        "Community forums access",
        "Basic analytics"
      ],
      color: "mint"
    },
    pro: {
      name: "Pro Learner",
      price: "$19.99",
      period: "per month",
      description: "Complete learning platform with all premium features",
      features: [
        "Everything in Lite",
        "Unlimited social links",
        "Advanced analytics",
        "Priority support",
        "Exclusive events",
        "Course creation tools",
        "Revenue sharing"
      ],
      color: "mint"
    }
  };

  const currentPlan = planData[planId as keyof typeof planData] || planData.free;

  return (
    <RefinedPageLayout title={currentPlan.name} backUrl="/pricing">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-forest-light border border-mint/10 p-8 mb-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              {planId === 'pro' && <Crown className="h-8 w-8 text-mint mr-2" />}
              {planId === 'lite' && <Star className="h-8 w-8 text-mint mr-2" />}
              <h2 className="text-4xl font-bold text-white">{currentPlan.name}</h2>
            </div>
            <div className="flex items-baseline justify-center mb-4">
              <span className="text-5xl font-bold text-mint">{currentPlan.price}</span>
              <span className="text-white/70 ml-2">/{currentPlan.period}</span>
            </div>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {currentPlan.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">What's Included</h3>
              <ul className="space-y-3">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-mint flex-shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-forest p-6 rounded-lg border border-mint/10">
              <h3 className="text-xl font-bold text-white mb-4">Perfect For</h3>
              <ul className="space-y-2 text-white/80">
                {planId === 'free' && (
                  <>
                    <li>• New users exploring the platform</li>
                    <li>• Casual learners</li>
                    <li>• Students and hobbyists</li>
                  </>
                )}
                {planId === 'lite' && (
                  <>
                    <li>• Active learners</li>
                    <li>• Professional development</li>
                    <li>• Small teams and groups</li>
                  </>
                )}
                {planId === 'pro' && (
                  <>
                    <li>• Professional educators</li>
                    <li>• Course creators</li>
                    <li>• Businesses and organizations</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button 
              className="bg-mint hover:bg-mint/90 text-forest px-8 py-6 text-lg hover-scale"
              size="lg"
            >
              {planId === 'free' ? 'Get Started Free' : `Subscribe to ${currentPlan.name}`}
            </Button>
            {planId !== 'free' && (
              <p className="text-white/60 text-sm mt-4">
                30-day money-back guarantee • Cancel anytime
              </p>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-forest-light border border-mint/10 p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-2">24/7 Support</h3>
            <p className="text-white/70">Get help whenever you need it</p>
          </Card>
          <Card className="bg-forest-light border border-mint/10 p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Regular Updates</h3>
            <p className="text-white/70">New features added monthly</p>
          </Card>
          <Card className="bg-forest-light border border-mint/10 p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Community Access</h3>
            <p className="text-white/70">Connect with fellow learners</p>
          </Card>
        </div>
      </div>
    </RefinedPageLayout>
  );
};

export default PlanDetails;
