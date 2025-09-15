import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { PlanFeature, PlanType, PlanCategory } from "@/components/pricing/types";
import PlansGrid from "@/components/pricing/PlansGrid";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import FaqSection from "@/components/pricing/FaqSection";
import ContactCta from "@/components/pricing/ContactCta";

const Pricing = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [planCategory, setPlanCategory] = useState<PlanCategory>("learner"); // Default to learner plans
  const [currentPlan, setCurrentPlan] = useState<PlanType>("Free"); // In real app, this would come from user context
  
  // Define all features with their availability for each plan
  const allFeatures: PlanFeature[] = [
    // Creator features
    { name: "Publish courses/e-books", free: true, pro: true, expert: true, description: "Free: up to 1 course or 1 e-book. Pro: unlimited. Expert: unlimited" },
    { name: "Basic AI-generated summary and quiz", free: true, pro: true, expert: true },
    { name: "Advanced AI tools", pro: true, expert: true, description: "Enhanced summaries, dynamic quizzes, video script generation" },
    { name: "AI Course Builder", expert: true, description: "Turn text into a full course with videos, quizzes, and summaries in one click" },
    { name: "Analytics", free: true, pro: true, expert: true, description: "Free: views and purchases only. Pro: completion rates, engagement. Expert: all + exportable reports" },
    { name: "Custom course page URL", pro: true, expert: true, description: "e.g., yourname.taskmason.app" },
    { name: "Priority email support", pro: true, expert: true },
    { name: "Featured in “Top Creators” section", pro: true, expert: true },
    { name: "Revenue share", free: true, pro: true, expert: true, description: "Free/Pro: 70% of revenue. Expert: 80% of revenue" },
    { name: "Custom branding or domain support", expert: true },
    { name: "“Verified Creator” badge", expert: true },
    { name: "Early access to new features", expert: true },
    { name: "Dedicated onboarding call", expert: true },
    
    // Learner features
    { name: "Access to free courses", free: true, standard: true, premium: true },
    { name: "Unlimited course access", standard: true, premium: true },
    { name: "Full AI summaries", standard: true, premium: true },
    { name: "Interactive quizzes", standard: true, premium: true },
    { name: "Learning progress tracking", standard: true, premium: true },
    { name: "Download course materials", standard: true, premium: true },
    { name: "Course certificates", standard: true, premium: true },
    { name: "Ad-free experience", standard: true, premium: true },
    { name: "Personalized AI learning path", premium: true },
    { name: "Live Q&A sessions", premium: true },
    { name: "Download course videos", premium: true },
    { name: "Priority customer support", premium: true },
    { name: "Exclusive community access", premium: true },
    { name: "Early access to beta features", premium: true },
  ];

  const creatorPlans = [
    {
      name: "Free" as PlanType,
      price: "$0",
      period: "per month",
      description: "Perfect for getting started with content creation.",
      features: allFeatures.filter(feature => feature.free),
      limitations: allFeatures.filter(feature => !feature.free || (feature.free && !feature.pro && !feature.expert)),
      cta: currentPlan === "Free" ? "Current Plan" : "Get Started",
      highlighted: false,
      disabled: currentPlan === "Free",
      tagline: "Start publishing content with basic tools and earn 70% revenue share."
    },
    {
      name: "Pro" as PlanType,
      price: billingPeriod === "monthly" ? "$9.99" : "$99",
      period: billingPeriod === "monthly" ? "per month" : "per year",
      description: "For serious creators looking to grow their audience.",
      features: allFeatures.filter(feature => feature.pro),
      limitations: allFeatures.filter(feature => !feature.pro || (feature.pro && !feature.expert)),
      cta: currentPlan === "Pro" ? "Current Plan" : "Subscribe Now",
      highlighted: true,
      disabled: currentPlan === "Pro",
      tagline: "Unlock unlimited content creation with advanced AI tools and detailed analytics.",
      paddleId: billingPeriod === "monthly" ? "pri_01k51ysk9wtpwcz4x5rsb7d362" : "pri_01k51yxp6zgz7w2fagp2a6m7h2"
    },
    {
      name: "Expert" as PlanType,
      price: "$120",
      period: "per year",
      description: "For professional creators seeking maximum growth and revenue.",
      features: allFeatures.filter(feature => feature.expert),
      limitations: [],
      cta: currentPlan === "Expert" ? "Current Plan" : "Subscribe Now",
      highlighted: false,
      disabled: currentPlan === "Expert",
      tagline: "Get all Pro features plus exclusive tools and 80% revenue share.",
      paddleId: "pri_01k51z9r135e82ypqk1knc8b3j"
    }
  ];

  const learnerPlans = [
    {
      name: "Free" as PlanType,
      price: "$0",
      period: "per month",
      description: "Perfect for beginners who want to explore Taskmason.",
      features: allFeatures.filter(feature => feature.free),
      limitations: allFeatures.filter(feature => !feature.standard && !feature.premium),
      cta: currentPlan === "Free" ? "Current Plan" : "Get Started",
      highlighted: false,
      disabled: currentPlan === "Free",
      tagline: "Access one free course per month with basic AI summary and limited quiz access."
    },
    {
      name: "Standard" as PlanType,
      price: billingPeriod === "monthly" ? "$4.99" : "$49",
      period: billingPeriod === "monthly" ? "per month" : "per year",
      description: "Ideal for casual learners who want more flexibility.",
      features: allFeatures.filter(feature => feature.standard),
      limitations: allFeatures.filter(feature => !feature.standard || (feature.standard && !feature.premium)),
      cta: currentPlan === "Standard" ? "Current Plan" : "Subscribe Now",
      highlighted: false,
      disabled: currentPlan === "Standard",
      tagline: "Get unlimited access to all courses and e-books with full AI summaries and interactive quizzes.",
      paddleId: billingPeriod === "monthly" ? "pri_01k51zp1ejcjqmswnrj2q26dt1" : "pri_01k51zsp4qje9getd9jpec6b3p"
    },
    {
      name: "Premium" as PlanType,
      price: billingPeriod === "monthly" ? "$9.99" : "$99",
      period: billingPeriod === "monthly" ? "per month" : "per year",
      description: "For dedicated students who want premium access and advanced tools.",
      features: allFeatures.filter(feature => feature.premium),
      limitations: [],
      cta: currentPlan === "Premium" ? "Current Plan" : "Subscribe Now",
      highlighted: true,
      disabled: currentPlan === "Premium",
      tagline: "Get everything in Standard plus personalized learning paths, live Q&A sessions, and priority support.",
      paddleId: billingPeriod === "monthly" ? "pri_01k5200g2s8tctr6xqfpgwgkpb" : "pri_01k5201t7qvc4gz9sq5cb1w8kt"
    }
  ];

  const plans = planCategory === "creator" ? creatorPlans : learnerPlans;

  const faqs = [
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle."
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 14-day money-back guarantee if you're not satisfied with your subscription."
    },
    {
      question: "Are there any discounts for students or educators?",
      answer: "Yes, we offer special educational discounts. Contact our support team with your academic credentials to learn more."
    },
    {
      question: "Can I try the paid features before subscribing?",
      answer: "Yes, we offer a 7-day free trial of all our paid plans. No credit card required to start."
    },
    {
      question: "How does revenue sharing work for creators?",
      answer: "Creators receive 70% of the revenue generated from their courses with the Pro plan and 80% with the Expert plan."
    }
  ];

  const handleSubscribe = (plan: PlanType) => {
    if (plan === currentPlan) {
      toast.info(`You are already subscribed to the ${plan} plan.`);
      return;
    }
    
    if (plan === "Free") {
      toast.success(`You've switched to the ${plan} plan!`);
      setCurrentPlan(plan);
      // In a real app, this would call an API to downgrade the plan
    } else {
      // In a real app, this would redirect to a payment page
      toast.success(`You selected the ${plan} plan!`, {
        description: "Redirecting to payment processing...",
      });
      
      // Simulate payment processing and then update the plan
      setTimeout(() => {
        setCurrentPlan(plan);
        toast.success(`You've successfully subscribed to ${plan}!`);
        navigate("/dashboard");
      }, 2000);
    }
  };

  const getAnnualDiscount = (monthlyPrice: string) => {
    const price = parseFloat(monthlyPrice.replace('$', ''));
    if (planCategory === "creator") {
      if (price === 9.99) return "20"; // $9.99 * 12 = $119.88, annual is $99, save ~$20
    } else {
      if (price === 4.99) return "10"; // $4.99 * 12 = $59.88, annual is $49, save ~$10
      if (price === 9.99) return "20"; // $9.99 * 12 = $119.88, annual is $99, save ~$20
    }
    return "0";
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="py-16 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
            Choose the plan that works best for you. All plans include core features with options to upgrade as you grow.
          </p>
          
          {/* Plan Category Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-forest-light border border-mint/20 rounded-lg">
              <button
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  planCategory === "learner"
                    ? "bg-mint text-forest"
                    : "text-white/70 hover:text-white"
                }`}
                onClick={() => setPlanCategory("learner")}
              >
                Learner Plans
              </button>
              <button
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  planCategory === "creator"
                    ? "bg-mint text-forest"
                    : "text-white/70 hover:text-white"
                }`}
                onClick={() => setPlanCategory("creator")}
              >
                Creator Plans
              </button>
            </div>
          </div>
          
          {/* Billing Toggle */}
          <div className="flex justify-center items-center mb-12">
            <span className={`mr-3 font-medium ${billingPeriod === "monthly" ? "text-white" : "text-white/50"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
              className="relative rounded-full w-14 h-7 bg-forest-light border border-mint/20 transition-colors"
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-mint transition-transform ${
                  billingPeriod === "monthly" ? "left-1" : "left-8"
                }`}
              />
            </button>
            <span className={`ml-3 font-medium ${billingPeriod === "annual" ? "text-white" : "text-white/50"}`}>
              Annual
            </span>
            {billingPeriod === "annual" && (
              <span className="ml-3 bg-mint/20 text-mint text-xs font-medium px-2 py-1 rounded">
                Save up to 20%
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Pricing Cards */}
      <PlansGrid 
        plans={plans}
        getAnnualDiscount={getAnnualDiscount}
        billingPeriod={billingPeriod}
        currentPlan={currentPlan}
        onSubscribe={handleSubscribe}
      />
      
      {/* Compare Plans Section */}
      <FeatureComparison features={allFeatures} />
      
      {/* FAQ Section */}
      <FaqSection faqs={faqs} />
      
      {/* CTA Section */}
      <ContactCta />
      
      <Footer />
    </main>
  );
};

export default Pricing;