import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface PaymentFormProps {
  selectedMethod: string;
  onPaymentSuccess: () => void;
}

const PaymentForm = ({ selectedMethod, onPaymentSuccess }: PaymentFormProps) => {
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCheckout = () => {
    if (selectedMethod === 'crypto') {
      // For crypto payments, we would show the crypto payment details
      toast({
        title: "Crypto Payment",
        description: "Crypto payment option selected. In a real implementation, this would show wallet address and payment details.",
      });
      onPaymentSuccess();
      return;
    }

    if (!cardHolder || !cardNumber || !expiryDate || !cvv) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }
    
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed successfully!",
    });
    
    // Reset form
    setCardHolder('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    
    onPaymentSuccess();
  };

  // Render crypto payment information when crypto is selected
  if (selectedMethod === 'crypto') {
    return (
      <div className="form bg-dark-purple max-w-md w-full mx-auto rounded-xl border border-yellow-500/30 shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-yellow-500">Crypto Payment</h2>
          <div className="flex space-x-2">
            <div className="w-8 h-5 bg-yellow-500 rounded"></div>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-300 mb-2">Send exactly:</p>
          <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/30">
            <p className="text-2xl font-bold text-yellow-500">50.00 USDT</p>
            <p className="text-gray-400 text-sm">TRC20 Network</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-300 mb-2">To this wallet address:</p>
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 break-all">
            <p className="text-yellow-500 font-mono text-sm">TXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-300 mb-2">Scan QR code:</p>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32" />
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-300 mb-2">Time remaining:</p>
          <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/30">
            <p className="text-red-500 font-bold text-center">14:59</p>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4">
          After sending the payment, your transaction will be confirmed automatically within 60 seconds.
        </p>
        
        <Button 
          onClick={handleCheckout}
          className="checkout-btn bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-full py-6 mt-4 rounded-xl font-semibold transition-all duration-300"
        >
          I've Sent the Payment
        </Button>
      </div>
    );
  }

  return (
    <div className="form bg-dark-purple max-w-md w-full mx-auto rounded-xl border border-primary-purple/30 shadow-xl hover:shadow-primary-purple/20 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-primary-purple">Payment Details</h2>
        <div className="flex space-x-2">
          <div className="w-8 h-5 bg-blue-500 rounded"></div>
          <div className="w-8 h-5 bg-red-500 rounded"></div>
        </div>
      </div>
      
      <label htmlFor="name" className="label">
        <span className="title">Card holder full name</span>
        <input
          className="input-field bg-transparent border border-primary-purple/30 rounded-md focus:border-primary-purple focus:ring-primary-purple text-white"
          type="text"
          name="input-name"
          placeholder="Enter your full name"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
        />
      </label>
      
      <label htmlFor="serialCardNumber" className="label">
        <span className="title">Card Number</span>
        <input
          id="serialCardNumber"
          className="input-field bg-transparent border border-primary-purple/30 rounded-md focus:border-primary-purple focus:ring-primary-purple text-white"
          type="text"
          name="card-number"
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength={19}
        />
      </label>
      
      <div className="split">
        <label htmlFor="ExDate" className="label">
          <span className="title">Expiry Date</span>
          <input
            id="ExDate"
            className="input-field bg-transparent border border-primary-purple/30 rounded-md focus:border-primary-purple focus:ring-primary-purple text-white"
            type="text"
            name="expiry-date"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            maxLength={5}
          />
        </label>
        
        <label htmlFor="cvv" className="label">
          <span className="title">CVV</span>
          <input
            id="cvv"
            className="input-field bg-transparent border border-primary-purple/30 rounded-md focus:border-primary-purple focus:ring-primary-purple text-white"
            type="text"
            name="cvv"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength={3}
          />
        </label>
      </div>
      
      <Button 
        onClick={handleCheckout}
        className="checkout-btn bg-primary-purple hover:bg-transparent hover:text-primary-purple hover:border-primary-purple border-2 border-transparent w-full py-6 mt-4 rounded-xl font-semibold transition-all duration-300"
      >
        Checkout
      </Button>
    </div>
  );
};

export default PaymentForm;