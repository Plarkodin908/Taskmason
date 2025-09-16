import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, QrCode, Wallet } from "lucide-react";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";
import PaymentForm from "@/components/payment/PaymentForm";
import CryptoPaymentModal from "@/components/payment/CryptoPaymentModal";
import { toast } from "@/hooks/use-toast";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    currency: 'USD',
    productId: '',
    productType: 'course' as 'course' | 'ebook',
    userId: ''
  });

  // Get payment data from location state
  useEffect(() => {
    if (location.state) {
      setPaymentData(location.state as typeof paymentData);
    } else {
      // Redirect if no payment data
      toast({
        title: "Payment Error",
        description: "Invalid payment request",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [location.state, navigate]);

  const handlePaymentSuccess = () => {
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed successfully!",
    });
    navigate("/dashboard");
  };

  const handleCryptoPayment = () => {
    setIsCryptoModalOpen(true);
  };

  return (
    <RefinedPageLayout title="Secure Payment">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Complete Your Purchase</h1>
          <p className="text-white/70">
            Securely pay for your {paymentData.productType} using your preferred payment method
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Details */}
          <Card className="bg-dark-purple border-primary-purple/30 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-primary-purple/20">
                <span className="text-white/80">Product</span>
                <span className="text-white font-medium capitalize">{paymentData.productType}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-primary-purple/20">
                <span className="text-white/80">Price</span>
                <span className="text-white font-medium">{paymentData.currency} {paymentData.amount.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-primary-purple/20">
                <span className="text-white/80">Fees</span>
                <span className="text-white font-medium">{paymentData.currency} 0.00</span>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <span className="text-white font-bold">Total</span>
                <span className="text-xl font-bold text-primary-purple">
                  {paymentData.currency} {paymentData.amount.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary-purple/10 rounded-lg border border-primary-purple/20">
              <div className="flex items-center gap-2 text-primary-purple">
                <Lock className="h-4 w-4" />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <p className="text-white/70 text-xs mt-1">
                Your payment information is encrypted and securely processed.
              </p>
            </div>
          </Card>

          {/* Payment Methods */}
          <Card className="bg-dark-purple border-primary-purple/30 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
            
            <div className="space-y-4">
              <PaymentMethodSelector 
                selectedMethod={selectedMethod} 
                onChange={setSelectedMethod} 
              />
              
              {selectedMethod === 'crypto' ? (
                <Button 
                  onClick={handleCryptoPayment}
                  className="w-full bg-primary-purple hover:bg-primary-purple/90 text-white flex items-center justify-center gap-2"
                >
                  <QrCode className="h-4 w-4" />
                  Pay with Cryptocurrency
                </Button>
              ) : (
                <PaymentForm 
                  selectedMethod={selectedMethod}
                  amount={paymentData.amount}
                  currency={paymentData.currency}
                  productId={paymentData.productId}
                  productType={paymentData.productType}
                  userId={paymentData.userId}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              )}
              
              <div className="text-center text-xs text-white/50 pt-4">
                <p>
                  By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <CryptoPaymentModal
        isOpen={isCryptoModalOpen}
        onClose={() => setIsCryptoModalOpen(false)}
        amount={paymentData.amount}
        currency={paymentData.currency}
        productId={paymentData.productId}
        productType={paymentData.productType}
        userId={paymentData.userId}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </RefinedPageLayout>
  );
};

export default PaymentPage;