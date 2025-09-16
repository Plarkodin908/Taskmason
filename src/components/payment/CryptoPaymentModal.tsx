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
  productId: string;
  productType: 'course' | 'ebook';
  userId: string;
  onPaymentSuccess: () => void;
}

const CryptoPaymentModal = ({ 
  isOpen, 
  onClose, 
  amount, 
  currency, 
  productId, 
  productType,
  userId,
  onPaymentSuccess
}: CryptoPaymentModalProps) => {
  const [paymentInfo, setPaymentInfo] = useState<CryptoPaymentResponse | null>(null);
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>('pending');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && !paymentInfo && !isCreatingPayment) {
      createPayment();
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (paymentInfo && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining <= 0 && paymentInfo) {
      // Payment expired
      toast({
        title: "Payment Expired",
        description: "The payment window has expired. Please try again.",
        variant: "destructive",
      });
      onClose();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, paymentInfo]);

  useEffect(() => {
    let statusCheckTimer: NodeJS.Timeout;
    if (paymentInfo && transactionStatus === 'pending') {
      // Check transaction status every 30 seconds
      statusCheckTimer = setTimeout(() => {
        checkTransactionStatus();
      }, 30000);
    } else if (transactionStatus === 'confirmed') {
      toast({
        title: "Payment Confirmed",
        description: "Your payment has been confirmed. Thank you!",
      });
      onPaymentSuccess();
      onClose();
    } else if (transactionStatus === 'failed') {
      toast({
        title: "Payment Failed",
        description: "The transaction failed. Please try again or use another payment method.",
        variant: "destructive",
      });
    }
    return () => clearTimeout(statusCheckTimer);
  }, [transactionStatus, paymentInfo]);

  const createPayment = async () => {
    setIsCreatingPayment(true);
    try {
      const response = await cryptoPaymentService.createPayment({
        amount,
        currency,
        productId,
        productType,
        userId
      });
      setPaymentInfo(response);
      setTimeRemaining(Math.floor((response.expirationTime - Date.now()) / 1000));
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to create payment. Please try again.",
        variant: "destructive",
      });
      onClose();
    } finally {
      setIsCreatingPayment(false);
    }
  };

  const checkTransactionStatus = async () => {
    if (!paymentInfo) return;
    
    try {
      const statusResponse = await cryptoPaymentService.getTransactionStatus(paymentInfo.transactionId);
      setTransactionStatus(statusResponse.status);
    } catch (error) {
      console.error('Error checking transaction status:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRetry = () => {
    setPaymentInfo(null);
    setTransactionStatus('pending');
    setTimeRemaining(0);
    createPayment();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-dark-purple border-primary-purple/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {isCreatingPayment ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating Payment
              </>
            ) : transactionStatus === 'confirmed' ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                Payment Confirmed
              </>
            ) : (
              "Crypto Payment"
            )}
          </DialogTitle>
        </DialogHeader>
        
        {isCreatingPayment ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary-purple mb-4" />
            <p className="text-white/80">Creating secure payment...</p>
          </div>
        ) : paymentInfo ? (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-purple">
                {amount} {currency}
              </div>
              <p className="text-white/70 text-sm mt-1">
                Send exactly this amount to the address below
              </p>
            </div>
            
            <div className="bg-dark-purple/50 rounded-lg p-4 border border-primary-purple/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Time Remaining</span>
                <span className="font-mono text-red-400">
                  {formatTime(timeRemaining)}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/70 text-sm">Status</span>
                <span className={`font-medium ${
                  transactionStatus === 'confirmed' ? 'text-green-500' : 
                  transactionStatus === 'failed' ? 'text-red-500' : 'text-yellow-500'
                }`}>
                  {transactionStatus === 'pending' ? 'Waiting for payment' : 
                   transactionStatus === 'confirmed' ? 'Confirmed' : 'Failed'}
                </span>
              </div>
              
              <div className="flex flex-col space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-1">Send to Address</label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-black/30 p-2 rounded text-xs break-all">
                      {paymentInfo.paymentAddress}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(paymentInfo.paymentAddress)}
                      className="border-primary-purple/30 text-white hover:bg-primary-purple/10"
                    >
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-white/70 text-sm mb-1">QR Code</label>
                  <div className="flex justify-center">
                    <img 
                      src={paymentInfo.qrCodeUrl} 
                      alt="Payment QR Code" 
                      className="w-32 h-32 bg-white p-2 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-xs text-white/50">
              <p>
                Payment must be received within {formatTime(timeRemaining)} to secure your purchase.
                Do not close this window until payment is confirmed.
              </p>
            </div>
            
            {transactionStatus === 'failed' && (
              <div className="flex gap-2">
                <Button 
                  onClick={handleRetry}
                  className="flex-1 bg-primary-purple hover:bg-primary-purple/90"
                >
                  Try Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1 border-primary-purple/30 text-white hover:bg-primary-purple/10"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-white/80 text-center">
              Failed to create payment. Please try again.
            </p>
            <div className="flex gap-2 mt-4">
              <Button 
                onClick={handleRetry}
                className="bg-primary-purple hover:bg-primary-purple/90"
              >
                Retry
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose}
                className="border-primary-purple/30 text-white hover:bg-primary-purple/10"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CryptoPaymentModal;