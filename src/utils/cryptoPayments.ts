// Utility functions for crypto payment processing

export interface CryptoPaymentDetails {
  amount: number;
  currency: string;
  walletAddress: string;
  qrCodeData: string;
  expirationTime: number;
  transactionId: string;
}

// Format time in seconds to MM:SS format
export const formatTimeRemaining = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Validate a TRC20 wallet address
export const isValidTronAddress = (address: string): boolean => {
  // Basic validation for TRON addresses
  // TRON addresses start with 'T' and are 34 characters long
  const tronAddressRegex = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;
  return tronAddressRegex.test(address);
};

// Generate QR code data for wallet address
export const generateQRCodeData = (address: string, amount: number, currency: string): string => {
  // This would generate a proper QR code data string for crypto payments
  // For TRC20 USDT, it might look like: "tron:ADDRESS?amount=AMOUNT"
  return `tron:${address}?amount=${amount}&token=${currency}`;
};

// Check if payment has expired
export const isPaymentExpired = (expirationTime: number): boolean => {
  return Date.now() > expirationTime;
};

// Calculate time remaining for payment
export const getTimeRemaining = (expirationTime: number): number => {
  const now = Date.now();
  return Math.max(0, Math.floor((expirationTime - now) / 1000));
};

// Mock function to simulate blockchain transaction verification
export const verifyTransaction = async (
  transactionId: string,
  expectedAmount: number,
  walletAddress: string
): Promise<{ verified: boolean; confirmations: number }> => {
  // In a real implementation, this would interact with a blockchain API
  // to verify the transaction details
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock verification result
  // In reality, you would check:
  // 1. Transaction exists on the blockchain
  // 2. Amount matches expected amount
  // 3. Destination address matches the expected wallet
  // 4. Transaction has required confirmations
  
  return {
    verified: Math.random() > 0.2, // 80% chance of success for demo
    confirmations: Math.floor(Math.random() * 10) + 1
  };
};

export default {
  formatTimeRemaining,
  isValidTronAddress,
  generateQRCodeData,
  isPaymentExpired,
  getTimeRemaining,
  verifyTransaction
};