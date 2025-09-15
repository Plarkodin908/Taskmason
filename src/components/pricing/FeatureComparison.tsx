import { Check, X, Info } from "lucide-react";
import { PlanFeature } from "./types";

type FeatureComparisonProps = {
  features: PlanFeature[];
};

const FeatureComparison = ({ features }: FeatureComparisonProps) => {
  // Define all possible plan types for comparison
  const planTypes = [
    { key: "free", name: "Free" },
    { key: "standard", name: "Standard" },
    { key: "premium", name: "Premium" },
    { key: "pro", name: "Pro" },
    { key: "expert", name: "Expert" }
  ];

  return (
    <section className="py-16 px-4 bg-forest/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Compare Plan Features</h2>
          <p className="text-white/70">
            See all features side by side to find the perfect plan for your needs.
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 border-b border-mint/10">Feature</th>
                {planTypes.map((plan) => (
                  <th key={plan.key} className="text-center p-4 border-b border-mint/10 min-w-[100px]">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={idx} className="hover:bg-forest-light/50">
                  <td className="p-4 border-b border-mint/10 flex items-center gap-2">
                    {feature.name}
                    {feature.description && (
                      <span className="text-white/60 text-xs tooltip-container group relative">
                        <Info className="h-4 w-4 text-white/40 cursor-help" />
                        <span className="tooltip-text absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-forest-light border border-mint/10 rounded text-white w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-xs">
                          {feature.description}
                        </span>
                      </span>
                    )}
                  </td>
                  {planTypes.map((plan) => (
                    <td key={plan.key} className="text-center p-4 border-b border-mint/10">
                      {feature[plan.key as keyof PlanFeature] ? (
                        <Check className="h-5 w-5 text-mint mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-white/40 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparison;