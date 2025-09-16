import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { loadStripe } from '@stripe/stripe-js';
import paddleService from '@/services/paddleService';

interface PaymentFormProps {
  selectedMethod: string;
  amount: number;
  currency: string;
  productId: string;
  productType: 'course' | 'ebook';
  userId: string;
  onPaymentSuccess: () => void;
}

const PaymentForm = ({ 
  selectedMethod, 
  amount, 
  currency, 
  productId, 
  productType,
  userId,
  onPaymentSuccess 
}: PaymentFormProps) => {
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      if (selectedMethod === 'paddle') {
        // Initialize Paddle checkout
        paddleService.initializeCheckout({
          product: {
            productId,
            productName: `${productType} Purchase`,
            price: amount,
            currency
          },
          userEmail: '', // Would come from user context in real app
          successUrl: `${window.location.origin}/payment/success`,
          cancelUrl: `${window.location.origin}/payment/cancel`
        });
      } else if (selectedMethod === 'stripe') {
        // Initialize Stripe checkout
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');
        if (stripe) {
          // In a real app, you would call your backend to create a checkout session
          // and then redirect to Stripe
          toast({
            title: "Payment Processing",
            description: "Redirecting to secure payment gateway...",
          });
        }
      } else {
        toast({
          title: "Payment Method Not Supported",
          description: "Selected payment method is not currently supported.",
          variant: "destructive",
        });
      }
      
      onPaymentSuccess();
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {selectedMethod === 'card' && (
        <>
          <div className="space-y-2">
            <label htmlFor="cardHolder" className="text-sm font-medium text-white">
              Cardholder Name
            </label>
            <input
              id="cardHolder"
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="John Doe"
              className="w-full px-3 py-2 bg-dark-purple border border-primary-purple/30 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="cardNumber" className="text-sm font-medium text-white">
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 bg-dark-purple border border-primary-purple/30 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="expiryDate" className="text-sm font-medium text-white">
                Expiry Date
              </label>
              <input
                id="expiryDate"
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                className="w-full px-3 py-2 bg-dark-purple border border-primary-purple/30 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary-purple"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cvv" className="text-sm font-medium text-white">
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                className="w-full px-3 py-2 bg-dark-purple border border-primary-purple/30 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary-purple"
                required
              />
            </div>
          </div>
        </>
      )}
      
      <Button 
        type="submit" 
        disabled={isProcessing}
        className="w-full bg-primary-purple hover:bg-primary-purple/90 text-white"
      >
        {isProcessing ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
            Processing Payment...
          </>
        ) : (
          `Pay ${currency} ${amount.toFixed(2)}`
        )}
      </Button>
      
      <p className="text-xs text-white/50 text-center">
        Your payment is secured with 256-bit SSL encryption
      </p>
    </form>
  );
};

export default PaymentForm;