// src/services/wiseService.ts
// Service to handle Wise (TransferWise) payment integration

// Wise configuration from environment variables
const WISE_API_TOKEN = import.meta.env.VITE_WISE_API_TOKEN || '';
const WISE_PROFILE_ID = import.meta.env.VITE_WISE_PROFILE_ID || '';
const WISE_API_URL = 'https://api.transferwise.com'; // Production URL

interface WiseTransfer {
  id: number;
  profile: number;
  sourceCurrency: string;
  targetCurrency: string;
  targetAmount: number;
  customerTransactionId: string;
}

interface WiseRecipient {
  id: number;
  profile: number;
  accountHolderName: string;
  currency: string;
  country: string;
  type: string;
  details: any;
}

class WiseService {
  private apiToken: string;
  private profileId: string;
  private apiUrl: string;

  constructor() {
    this.apiToken = WISE_API_TOKEN;
    this.profileId = WISE_PROFILE_ID;
    this.apiUrl = WISE_API_URL;
  }

  private getHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
    };
  }

  // Create a recipient account
  async createRecipient(recipientData: any): Promise<WiseRecipient> {
    // In a real implementation, this would call the Wise API
    // For now, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          profile: parseInt(this.profileId),
          accountHolderName: recipientData.accountHolderName,
          currency: recipientData.currency,
          country: recipientData.country,
          type: recipientData.type,
          details: recipientData.details
        });
      }, 500);
    });
  }

  // Create a transfer
  async createTransfer(transferData: any): Promise<WiseTransfer> {
    // In a real implementation, this would call the Wise API
    // For now, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          profile: parseInt(this.profileId),
          sourceCurrency: transferData.sourceCurrency,
          targetCurrency: transferData.targetCurrency,
          targetAmount: transferData.targetAmount,
          customerTransactionId: transferData.customerTransactionId || `txn_${Date.now()}`
        });
      }, 500);
    });
  }

  // Get transfer quote
  async getTransferQuote(sourceCurrency: string, targetCurrency: string, targetAmount: number): Promise<any> {
    // In a real implementation, this would call the Wise API
    // For now, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `quote_${Date.now()}`,
          sourceCurrency,
          targetCurrency,
          sourceAmount: targetAmount * 1.02, // Mock exchange rate
          targetAmount,
          rate: 1.02,
          fee: 1.5
        });
      }, 500);
    });
  }

  // Fund a transfer
  async fundTransfer(transferId: number): Promise<any> {
    // In a real implementation, this would call the Wise API
    // For now, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: transferId,
          status: 'processing',
          errorCode: null
        });
      }, 500);
    });
  }

  // Get transfer status
  async getTransferStatus(transferId: number): Promise<any> {
    // In a real implementation, this would call the Wise API
    // For now, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: transferId,
          status: 'completed',
          errorCode: null
        });
      }, 500);
    });
  }

  // Get account balances
  async getAccountBalances(): Promise<any> {
    // In a real implementation, this would call the Wise API
    // For now, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          balances: [
            {
              currency: 'USD',
              amount: 1000.00
            },
            {
              currency: 'EUR',
              amount: 850.00
            }
          ]
        });
      }, 500);
    });
  }
}

export default new WiseService();