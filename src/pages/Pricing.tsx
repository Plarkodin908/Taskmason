import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { PlanFeature, PlanType } from "@/components/pricing/types";
import PlansGrid from "@/components/pricing/PlansGrid";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import FaqSection from "@/components/pricing/FaqSection";
import { useAuth } from "@/contexts/AuthContext";
import paddleService from "@/services/paddleService";

// Define plan features
const planFeatures: PlanFeature[] = [
  {
    name: "Courses Access",
    free: true,
    lite: true,
    pro: true,
    educator: true,
    description: "Access to all available courses"
  },
  {
    name: "E-books Access",
    free: true,
    lite: true,
    pro: true,
    educator: true,
    description: "Access to all available e-books"
  },
  {
    name: "Premium Content",
    lite: false,
    pro: true,
    educator: true,
    description: "Access to premium courses and e-books"
  },
  {
    name: "Ad-free Experience",
    lite: false,
    pro: true,
    educator: true,
    description: "Enjoy learning without advertisements"
  },
  {
    name: "Offline Access",
    lite: false,
    pro: true,
    educator: true,
    description: "Download content for offline learning"
  },
  {
    name: "AI Learning Path",
    lite: false,
    pro: true,
    educator: true,
    description: "Personalized learning recommendations"
  },
  {
    name: "Certificate of Completion",
    free: true,
    lite: true,
    pro: true,
    educator: true,
    description: "Earn certificates for completed courses"
  },
  {
    name: "Community Access",
    free: true,
    lite: true,
    pro: true,
    educator: true,
    description: "Join our learning community"
  },
  {
    name: "Priority Support",
    pro: false,
    educator: true,
    description: "Get faster help from our support team"
  },
  {
    name: "Course Creation",
    educator: true,
    description: "Create and publish your own courses"
  },
  {
    name: "Student Management",
    educator: true,
    description: "Manage your students and track progress"
  },
  {
    name: "Revenue Sharing",
    educator: true,
    description: "Earn money from your course sales"
  }
];

// Define plan definitions
const planDefinitions = [
  {
    name: "Free" as PlanType,
    price: "0",
    period: "forever",
    description: "Perfect for getting started with learning",
    features: planFeatures,
    limitations: [],
    cta: "Get Started",
    highlighted: false,
    disabled: false
  },
  {
    name: "Lite" as PlanType,
    price: "9",
    period: "per month",
    description: "Great for regular learners",
    features: planFeatures,
    limitations: [],
    cta: "Choose Lite",
    highlighted: false,
    disabled: false
  },
  {
    name: "Pro" as PlanType,
    price: "19",
    period: "per month",
    description: "Ideal for serious learners and professionals",
    features: planFeatures,
    limitations: [],
    cta: "Choose Pro",
    highlighted: true,
    disabled: false,
    tagline: "Most Popular"
  },
  {
    name: "Educator" as PlanType,
    price: "29",
    period: "per month",
    description: "For content creators and educators",
    features: planFeatures,
    limitations: [],
    cta: "Become an Educator",
    highlighted: false,
    disabled: false
  }
];

const faqs = [
  {
    question: "Can I change my plan at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged a prorated amount for the remainder of your billing cycle."
  },
  {
    question: "Do you offer discounts for students or educators?",
    answer: "Yes, we offer special pricing for students and educators. Please contact our support team with proof of your status to receive a discount."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and several cryptocurrency options including Bitcoin, Ethereum, and Litecoin."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, all our paid plans come with a 7-day free trial. You can cancel anytime during the trial period without being charged."
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "If you exceed your plan limits, we'll notify you and give you the option to upgrade to a higher plan. We won't restrict your access to content."
  }
];

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const { user, upgradeSubscription } = useAuth();
  const navigate = useNavigate();

  // Calculate annual discount
  const getAnnualDiscount = (monthlyPrice: string) => {
    const monthly = parseFloat(monthlyPrice);
    const annual = monthly * 12 * 0.8; // 20% discount
    const savings = monthly * 12 - annual;
    return savings.toFixed(0);
  };

  const handleSubscribe = async (plan: string) => {
    if (!user) {
      toast.error("Please sign in to subscribe to a plan");
      navigate("/auth/sign-in");
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real app, you would integrate with your payment provider
      if (plan === "Free") {
        upgradeSubscription("Free");
        toast.success("You're now on the Free plan!");
        navigate("/");
      } else {
        // For paid plans, redirect to payment
        const planPrices = await paddleService.getProductPrices([
          // These would be real product IDs from your payment provider
          "product_free",
          "product_lite",
          "product_pro",
          "product_educator"
        ]);
        
        // Find the selected plan price
        const selectedPlan = planPrices.response.products.find(
          (p: any) => p.product_id === `product_${plan.toLowerCase()}`
        );
        
        if (selectedPlan) {
          // Initialize payment
          paddleService.initializeCheckout({
            product: {
              productId: selectedPlan.product_id,
              productName: `${plan} Plan`,
              price: selectedPlan.price.gross,
              currency: selectedPlan.currency
            },
            userEmail: user.email,
            successUrl: `${window.location.origin}/payment/success`,
            cancelUrl: `${window.location.origin}/pricing`
          });
        } else {
          toast.error("Failed to initialize payment. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Failed to process subscription. Please try again.");
      console.error("Subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Unlock your potential with our flexible pricing options. 
              Start learning today and upgrade as you grow.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center mt-10">
              <span className={`mr-3 font-medium ${billingPeriod === "monthly" ? "text-white" : "text-white/70"}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
                className="relative rounded-full w-14 h-7 bg-primary-purple/20 transition-colors"
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-primary-purple transition-transform ${
                    billingPeriod === "monthly" ? "left-1" : "left-8"
                  }`}
                />
              </button>
              <span className={`ml-3 font-medium ${billingPeriod === "annual" ? "text-white" : "text-white/70"}`}>
                Annual <span className="text-mint">(Save 20%)</span>
              </span>
            </div>
          </div>
          
          {/* Plans Grid */}
          <PlansGrid 
            plans={planDefinitions}
            getAnnualDiscount={getAnnualDiscount}
            billingPeriod={billingPeriod}
            currentPlan={user?.membership || "Free"}
            onSubscribe={handleSubscribe}
          />
          
          {/* Feature Comparison */}
          <FeatureComparison features={planFeatures} />
          
          {/* FAQ Section */}
          <FaqSection faqs={faqs} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Pricing;