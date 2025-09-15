import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { PlanFeature } from "./types";
import { useNavigate } from "react-router-dom";

type PlanCardProps = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  limitations: PlanFeature[];
  cta: string;
  highlighted: boolean;
  disabled: boolean;
  tagline?: string;
  getAnnualDiscount?: (price: string) => string;
  billingPeriod: "monthly" | "annual";
  onSubscribe: (plan: string) => void;
  currentPlan: string;
  paddleId?: string;
};

const PlanCard = ({
  name,
  price,
  period,
  description,
  features,
  limitations,
  cta,
  highlighted,
  disabled,
  tagline,
  getAnnualDiscount,
  billingPeriod,
  onSubscribe,
  currentPlan,
  paddleId
}: PlanCardProps) => {
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    if (name === currentPlan) {
      return; // Already subscribed
    }
    
    // For free plan, just use the onSubscribe function
    if (name === "Free") {
      onSubscribe(name);
      return;
    }
    
    // For paid plans, navigate to payment page with Paddle ID
    const params = new URLSearchParams();
    params.append("plan", name);
    params.append("price", price);
    params.append("period", period);
    if (paddleId) {
      params.append("paddleId", paddleId);
    }
    
    navigate(`/payment?${params.toString()}`);
  };

  return (
    <Card 
      className={`
        relative overflow-hidden bg-forest-light border 
        ${name === currentPlan ? 'border-mint' : highlighted ? 'border-mint' : 'border-mint/10'} 
        flex flex-col animate-fade-in card-hover
        ${highlighted ? 'transform md:scale-105 z-10' : ''}
      `}
    >
      {highlighted && (
        <div className="absolute top-0 right-0 bg-mint text-forest px-4 py-1 text-sm font-medium">
          Most Popular
        </div>
      )}

      {name === currentPlan && (
        <div className="absolute top-0 left-0 right-0 bg-mint/20 text-white px-4 py-1 text-sm font-medium text-center">
          Current Plan
        </div>
      )}

      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-mint">{price}</span>
          <span className="text-white/60 ml-2">{period}</span>
          {billingPeriod === "annual" && name !== "Free" && getAnnualDiscount && (
            <p className="text-mint/80 text-sm mt-1">
              Save ${getAnnualDiscount(price.replace('$', ''))} per year
            </p>
          )}
        </div>
        <p className="text-white/70 mb-6">{description}</p>
        
        {tagline && (
          <div className="mb-6 bg-mint/5 border border-mint/10 p-4 rounded-md">
            <p className="text-white/90 italic text-sm">"{tagline}"</p>
          </div>
        )}
        
        <div className="mb-6">
          <p className="font-medium mb-2">What's included:</p>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-mint flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/80">{feature.name}</span>
                  {feature.description && (
                    <div className="text-white/50 text-xs mt-0.5">{feature.description}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {limitations.length > 0 && (
          <div className="mb-6">
            <p className="font-medium mb-2">Limitations:</p>
            <ul className="space-y-2">
              {limitations.map((limitation, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <X className="h-5 w-5 text-white/40 flex-shrink-0" />
                  <span className="text-white/60">{limitation.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="p-6 border-t border-mint/10">
        <Button 
          className={`w-full ${
            name === currentPlan 
              ? 'bg-forest border border-mint/20 text-mint/50 cursor-not-allowed' 
              : highlighted 
                ? 'bg-mint hover:bg-mint/90 text-forest' 
                : 'bg-forest border border-mint/20 text-mint hover:bg-forest/80'
          }`}
          onClick={handleSubscribeClick}
          disabled={disabled}
        >
          {cta}
        </Button>
      </div>
    </Card>
  );
};

export default PlanCard;