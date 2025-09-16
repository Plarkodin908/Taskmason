// src/services/paddleService.ts
// Service to handle Paddle payment integration

// Paddle configuration from environment variables
const PADDLE_VENDOR_ID = import.meta.env.VITE_PADDLE_VENDOR_ID || '';
const PADDLE_API_KEY = import.meta.env.VITE_PADDLE_API_KEY || '';
const PADDLE_PUBLIC_KEY = import.meta.env.VITE_PADDLE_PUBLIC_KEY || '';

// Declare Paddle on window object
declare global {
  interface Window {
    Paddle?: any;
  }
}

interface PaddleProduct {
  productId: string;
  productName: string;
  price: number;
  currency: string;
}

interface PaddleCheckoutOptions {
  product: PaddleProduct;
  userEmail?: string;
  passthrough?: string;
  successUrl?: string;
  cancelUrl?: string;
}

interface ProductPriceResponse {
  success: boolean;
  response: {
    products: Array<{
      product_id: string;
      currency: string;
      price: {
        gross: number;
      };
    }>;
  };
}

interface SubscriptionPaymentResponse {
  success: boolean;
  subscriptionId: string;
  paymentId: string;
  status: string;
}

interface OneTimePaymentResponse {
  success: boolean;
  paymentId: string;
  receiptUrl: string;
  status: string;
}

interface RefundResponse {
  success: boolean;
  refundId: string;
  status: string;
}

// New interface for creating Paddle products
interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  currency: string;
  category?: string;
  tax_category?: string;
  custom_fields?: Array<{
    name: string;
    value: string;
  }>;
}

interface CreateProductResponse {
  success: boolean;
  product_id?: string;
  error?: string;
}

class PaddleService {
  private vendorId: string;
  private apiKey: string;
  private publicKey: string;

  constructor() {
    this.vendorId = PADDLE_VENDOR_ID;
    this.apiKey = PADDLE_API_KEY;
    this.publicKey = PADDLE_PUBLIC_KEY;

    // Initialize Paddle if available
    if (typeof window !== 'undefined' && window.Paddle) {
      window.Paddle.Setup({ vendor: parseInt(this.vendorId) });
    }
  }

  // Initialize Paddle checkout
  initializeCheckout(options: PaddleCheckoutOptions): void {
    if (typeof window === 'undefined' || !window.Paddle) {
      console.warn('Paddle is not available in this environment');
      return;
    }

    const checkoutConfig: any = {
      product: options.product.productId,
      email: options.userEmail,
      passthrough: options.passthrough,
      success: options.successUrl,
      closeCallback: () => {
        console.log('Paddle checkout closed');
      },
      loadedCallback: () => {
        console.log('Paddle checkout loaded');
      }
    };

    if (options.cancelUrl) {
      checkoutConfig.closeUrl = options.cancelUrl;
    }

    window.Paddle.Checkout.open(checkoutConfig);
  }

  // Create a product in Paddle
  async createProduct(productData: CreateProductRequest): Promise<CreateProductResponse> {
    try {
      const response = await fetch('https://vendors.paddle.com/api/2.0/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          vendor_id: this.vendorId,
          vendor_auth_code: this.apiKey,
          name: productData.name,
          description: productData.description,
          price: productData.price.toString(),
          currency: productData.currency,
          // Optional fields
          ...(productData.category && { category: productData.category }),
          ...(productData.tax_category && { tax_category: productData.tax_category }),
        })
      });

      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          product_id: data.response.product_id
        };
      } else {
        return {
          success: false,
          error: data.error?.message || 'Failed to create product in Paddle'
        };
      }
    } catch (error) {
      console.error('Error creating product in Paddle:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Get product prices
  async getProductPrices(productIds: string[]): Promise<ProductPriceResponse> {
    // In a real implementation, this would call the Paddle API
    // For now, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockPrices = productIds.map(id => ({
          product_id: id,
          currency: 'USD',
          price: {
            gross: 19.99
          }
        }));
        
        resolve({
          success: true,
          response: {
            products: mockPrices
          }
        });
      }, 500);
    });
  }

  // Validate webhook
  validateWebhook(payload: string, signature: string): boolean {
    // In a real implementation, this would validate the webhook signature
    // using the Paddle public key
    console.log('Validating Paddle webhook:', payload, signature);
    
    // For demo purposes, we're just checking if signature exists
    // In production, you should properly verify the signature using the Paddle public key
    return !!signature;
  }

  // Process subscription payment
  async processSubscriptionPayment(
    planId: string,
    customerId: string,
    amount: number,
    currency: string = 'USD'
  ): Promise<SubscriptionPaymentResponse> {
    // In a real implementation, this would call the Paddle API
    // to create a subscription payment
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          subscriptionId: `sub_${Date.now()}`,
          paymentId: `pay_${Date.now()}`,
          status: 'active'
        });
      }, 500);
    });
  }

  // Process one-time payment
  async processOneTimePayment(
    productId: string,
    customerId: string,
    amount: number,
    currency: string = 'USD'
  ): Promise<OneTimePaymentResponse> {
    // In a real implementation, this would call the Paddle API
    // to create a one-time payment
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          paymentId: `pay_${Date.now()}`,
          receiptUrl: 'https://example.com/receipt',
          status: 'completed'
        });
      }, 500);
    });
  }

  // Refund payment
  async refundPayment(paymentId: string, amount: number, reason: string): Promise<RefundResponse> {
    // In a real implementation, this would call the Paddle API
    // to process a refund
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve({
            success: true,
            refundId: `ref_${Date.now()}`,
            status: 'processed'
          });
        } else {
          reject(new Error('Refund failed'));
        }
      }, 500);
    });
  }
}

export default new PaddleService();