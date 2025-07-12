
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Shield, Lock, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";

const PaymentPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan] = useState({
    name: "Pro Learner",
    price: "$19.99",
    period: "per month"
  });

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful! Welcome to Pro Learner!");
    }, 3000);
  };

  return (
    <RefinedPageLayout title="Secure Payment" backUrl="/pricing">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-forest-light border border-mint/10 p-8 mb-6">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-mint mr-2" />
            <h2 className="text-2xl font-bold text-white">Secure Checkout</h2>
          </div>

          {/* Order Summary */}
          <div className="bg-forest p-6 rounded-lg border border-mint/10 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80">{selectedPlan.name}</span>
              <span className="text-white font-medium">{selectedPlan.price}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-white/60 text-sm">Billing {selectedPlan.period}</span>
            </div>
            <div className="border-t border-mint/10 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-lg font-bold text-mint">{selectedPlan.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Email Address</label>
              <Input 
                type="email"
                placeholder="your@email.com"
                className="bg-forest border-mint/20 text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Card Information</label>
              <div className="space-y-3">
                <div className="relative">
                  <Input 
                    placeholder="1234 5678 9012 3456"
                    className="bg-forest border-mint/20 text-white pl-12"
                  />
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input 
                    placeholder="MM / YY"
                    className="bg-forest border-mint/20 text-white"
                  />
                  <Input 
                    placeholder="CVC"
                    className="bg-forest border-mint/20 text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Cardholder Name</label>
              <Input 
                placeholder="Full name on card"
                className="bg-forest border-mint/20 text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Billing Address</label>
              <div className="space-y-3">
                <Input 
                  placeholder="Address line 1"
                  className="bg-forest border-mint/20 text-white"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input 
                    placeholder="City"
                    className="bg-forest border-mint/20 text-white"
                  />
                  <Input 
                    placeholder="ZIP Code"
                    className="bg-forest border-mint/20 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-mint/5 rounded-lg border border-mint/10">
              <Lock className="h-5 w-5 text-mint" />
              <div>
                <p className="text-white font-medium">Your payment is secure</p>
                <p className="text-white/60 text-sm">256-bit SSL encryption protects your information</p>
              </div>
            </div>

            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-mint hover:bg-mint/90 text-forest py-6 text-lg hover-scale"
            >
              {isProcessing ? (
                <>
                  <CreditCard className="mr-2 h-5 w-5 animate-pulse" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Complete Payment {selectedPlan.price}
                </>
              )}
            </Button>

            <p className="text-center text-white/60 text-sm">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy.
              You can cancel your subscription anytime.
            </p>
          </div>
        </Card>
      </div>
    </RefinedPageLayout>
  );
};

export default PaymentPage;
