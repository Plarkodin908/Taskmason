import { PlanDefinition, PlanFeature } from "./types";
import PlanCard from "./PlanCard";

type PlansGridProps = {
  plans: PlanDefinition[];
  getAnnualDiscount: (monthlyPrice: string) => string;
  billingPeriod: "monthly" | "annual";
  currentPlan: string;
  onSubscribe: (plan: string) => void;
};

const PlansGrid = ({ 
  plans, 
  getAnnualDiscount,
  billingPeriod,
  currentPlan,
  onSubscribe
}: PlansGridProps) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              limitations={plan.limitations}
              cta={plan.cta}
              highlighted={plan.highlighted}
              disabled={plan.disabled}
              tagline={plan.tagline}
              getAnnualDiscount={getAnnualDiscount}
              billingPeriod={billingPeriod}
              onSubscribe={onSubscribe}
              currentPlan={currentPlan}
              paddleId={plan.paddleId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansGrid;