import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, QrCode } from "lucide-react";
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector';
import PaymentForm from '@/components/payment/PaymentForm';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('credit');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [planInfo, setPlanInfo] = useState({
    name: '',
    price: '',
    paddleId: ''
  });

  // Get plan information from location state
  useEffect(() => {
    if (location.state) {
      setPlanInfo({
        name: (location.state as any).plan || '',
        price: (location.state as any).price || '',
        paddleId: (location.state as any).paddleId || ''
      });
    }
    
    // Also check URL parameters for backward compatibility
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('plan')) {
      setPlanInfo({
        name: searchParams.get('plan') || '',
        price: searchParams.get('price') || '',
        paddleId: searchParams.get('paddleId') || ''
      });
    }
  }, [location]);

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
  };

  const handlePaddlePayment = () => {
    if (planInfo.paddleId) {
      // In a real implementation, this would initialize Paddle checkout
      alert(`In a real implementation, this would redirect to Paddle checkout with ID: ${planInfo.paddleId}`);
      handlePaymentSuccess();
    } else {
      // Fallback to standard payment form
      setSelectedMethod('credit');
    }
  };

  if (paymentCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <RefinedPageLayout title="Payment Complete" backUrl="/pricing">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-card border-border text-center">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-card-foreground mb-2">Payment Successful!</h2>
                <p className="text-muted-foreground">
                  Your payment has been processed successfully. You now have access to all premium features.
                </p>
              </div>

              <div className="bg-muted/20 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="text-foreground font-mono">TX123456789</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="text-foreground">{planInfo.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan:</span>
                  <span className="text-foreground">{planInfo.name}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => navigate('/')}>
                  Back to Home
                </Button>
              </div>
            </Card>
          </div>
        </RefinedPageLayout>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RefinedPageLayout title="Payment" backUrl="/pricing">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-card border-border">
            <div className="text-center mb-8">
              <CreditCard className="h-12 w-12 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold text-card-foreground mb-2">
                {planInfo.name ? `Complete Your ${planInfo.name} Payment` : "Complete Your Payment"}
              </h2>
              <p className="text-muted-foreground">Secure checkout with 256-bit SSL encryption</p>
            </div>

            {planInfo.paddleId ? (
              <div className="mb-8 text-center">
                <p className="text-muted-foreground mb-6">
                  You have selected the {planInfo.name} plan for {planInfo.price}. 
                  Click below to proceed with payment through Paddle.
                </p>
                <Button 
                  onClick={handlePaddlePayment}
                  className="bg-primary hover:bg-primary/90 w-full max-w-xs mx-auto"
                >
                  Pay with Paddle
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  You will be redirected to Paddle's secure payment page.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <PaymentMethodSelector 
                    selectedMethod={selectedMethod} 
                    onChange={setSelectedMethod} 
                  />
                </div>

                <div className="mb-6">
                  <PaymentForm 
                    selectedMethod={selectedMethod} 
                    onPaymentSuccess={handlePaymentSuccess} 
                  />
                </div>
              </>
            )}

            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Plan:</span>
                <span className="text-foreground">{planInfo.name || 'Custom'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="text-foreground">{planInfo.price || '$0.00'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Tax:</span>
                <span className="text-foreground">$0.00</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total:</span>
                  <span className="font-semibold text-foreground">{planInfo.price || '$0.00'}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Your payment information is secure and encrypted. We never store your card details.
            </p>
          </Card>
        </div>
      </RefinedPageLayout>
    </div>
  );
};

export default PaymentPage;