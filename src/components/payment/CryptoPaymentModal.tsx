import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import cryptoPaymentService, { CryptoPaymentResponse, TransactionStatus } from '@/services/cryptoPaymentService';

interface CryptoPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: string;
  onPaymentSuccess: () => void;
  creatorWalletAddress: string;
  productId?: string;
  productType?: 'course' | 'ebook';
  userId?: string;
}

const CryptoPaymentModal = ({ 
  isOpen, 
  onClose, 
  amount, 
  currency, 
  onPaymentSuccess,
  creatorWalletAddress,
  productId,
  productType = 'course',
  userId
}: CryptoPaymentModalProps) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'confirmed' | 'expired'>('pending');
  const [copied, setCopied] = useState(false);
  const [paymentData, setPaymentData] = useState<CryptoPaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  // Generate payment address when modal opens
  useEffect(() => {
    if (isOpen && !paymentData) {
      generatePaymentAddress();
    }
  }, [isOpen]);

  // Timer effect
  useEffect(() => {
    if (!isOpen || paymentStatus !== 'pending' || !paymentData) return;

    const endTime = paymentData.expirationTime;
    const updateTimer = () => {
      const now = Date.now();
      const timeRemaining = Math.max(0, Math.floor((endTime - now) / 1000));
      
      if (timeRemaining <= 0) {
        setPaymentStatus('expired');
        return;
      }
      
      setTimeLeft(timeRemaining);
    };

    updateTimer(); // Initial update
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [isOpen, paymentStatus, paymentData]);

  const generatePaymentAddress = async () => {
    if (!productId || !userId) {
      // Fallback to static address if no product/user data
      setTimeLeft(15 * 60);
      return;
    }

    setLoading(true);
    try {
      const paymentInfo = await cryptoPaymentService.generatePaymentAddress({
        amount,
        currency,
        productId,
        productType,
        userId
      });
      
      setPaymentData(paymentInfo);
      setTimeLeft(Math.floor((paymentInfo.expirationTime - Date.now()) / 1000));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate payment address. Please try again.",
      });
      console.error("Failed to generate payment address:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Wallet address copied successfully",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const checkPaymentStatus = async () => {
    if (!paymentData) return;

    setCheckingStatus(true);
    try {
      const status: TransactionStatus = await cryptoPaymentService.checkPaymentStatus(
        paymentData.transactionId
      );

      if (status.status === 'confirmed') {
        // Confirm payment in our system
        const confirmed = await cryptoPaymentService.confirmPayment(paymentData.transactionId);
        if (confirmed) {
          setPaymentStatus('confirmed');
          toast({
            title: "Payment Confirmed",
            description: "Your payment has been confirmed. You now have access to the content.",
          });
          setTimeout(() => {
            onPaymentSuccess();
            onClose();
          }, 2000);
        }
      } else if (status.status === 'failed') {
        toast({
          variant: "destructive",
          title: "Payment Failed",
          description: "Your payment could not be processed. Please try again or contact support.",
        });
      } else {
        toast({
          title: "Payment Not Detected",
          description: "We haven't detected your payment yet. Please make sure you've sent the exact amount.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to check payment status. Please try again.",
      });
      console.error("Failed to check payment status:", error);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handlePaymentConfirmation = () => {
    // In a real implementation, this would check with backend
    if (productId && userId) {
      checkPaymentStatus();
    } else {
      // For demo purposes, simulate a successful payment
      setPaymentStatus('confirmed');
      toast({
        title: "Payment Confirmed",
        description: "Your payment has been confirmed. You now have access to the content.",
      });
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
      }, 2000);
    }
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-dark-purple border-primary-purple/30">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-purple mb-4" />
            <p className="text-white">Generating payment address...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-dark-purple border-primary-purple/30">
        <DialogHeader>
          <DialogTitle className="text-primary-purple flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black text-xs font-bold">USDT</span>
            </div>
            Pay with Crypto
          </DialogTitle>
        </DialogHeader>

        {paymentStatus === 'confirmed' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Payment Confirmed!</h3>
            <p className="text-gray-400 mb-6">
              Your payment has been confirmed. You now have access to the content.
            </p>
            <Button onClick={onClose} className="w-full bg-primary-purple hover:bg-primary-purple/90">
              Continue to Content
            </Button>
          </div>
        ) : paymentStatus === 'expired' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Payment Expired</h3>
            <p className="text-gray-400 mb-6">
              This payment request has expired. Please try again.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Close
              </Button>
              <Button onClick={generatePaymentAddress} className="flex-1">
                Generate New Address
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Amount to send:</span>
                <span className="text-xl font-bold text-yellow-500">
                  {amount.toFixed(2)} {currency}
                </span>
              </div>
              <p className="text-gray-400 text-sm">TRC20 Network</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Send to:</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(paymentData?.paymentAddress || creatorWalletAddress)}
                  className="text-yellow-500 hover:text-yellow-400"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 break-all">
                <p className="text-yellow-500 font-mono text-sm">
                  {paymentData?.paymentAddress || creatorWalletAddress}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Time remaining:</span>
              <span className="text-red-500 font-bold text-lg">{formatTime(timeLeft)}</span>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32" />
            </div>

            <p className="text-gray-400 text-sm text-center">
              After sending the payment, your transaction will be confirmed automatically within 60 seconds.
            </p>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePaymentConfirmation}
                disabled={checkingStatus}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900"
              >
                {checkingStatus ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Checking...
                  </>
                ) : (
                  "I've Sent the Payment"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CryptoPaymentModal;