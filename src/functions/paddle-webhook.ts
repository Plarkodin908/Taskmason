import { verifyPaddleWebhook } from '../utils/paddleWebhook';
import strapiApi from '../services/strapiApi';

// Define proper types for the handler function
interface WebhookEvent {
  httpMethod: string;
  headers: {
    'paddle-signature'?: string;
    'Paddle-Signature'?: string;
    [key: string]: string | undefined;
  };
  body: string;
}

interface WebhookContext {
  // Add context properties as needed
  [key: string]: unknown; // Using 'unknown' instead of 'any' for better type safety
}

interface WebhookResponse {
  statusCode: number;
  headers: {
    'Access-Control-Allow-Origin': string;
    'Access-Control-Allow-Headers': string;
    'Access-Control-Allow-Methods': string;
  };
  body: string;
}

// Define Paddle webhook payload types
interface PaddleWebhookPayload {
  alert_name: string;
  [key: string]: string | number | boolean | undefined;
}

interface PaddleProductCreatedPayload extends PaddleWebhookPayload {
  product_id: string;
  product_name: string;
  [key: string]: string | number | boolean | undefined;
}

interface PaddleProductUpdatedPayload extends PaddleWebhookPayload {
  product_id: string;
  [key: string]: string | number | boolean | undefined;
}

interface PaddleProductDeletedPayload extends PaddleWebhookPayload {
  product_id: string;
  [key: string]: string | number | boolean | undefined;
}

interface PaddleSubscriptionCreatedPayload extends PaddleWebhookPayload {
  subscription_id: string;
  [key: string]: string | number | boolean | undefined;
}

interface PaddleSubscriptionUpdatedPayload extends PaddleWebhookPayload {
  subscription_id: string;
  status: string;
  [key: string]: string | number | boolean | undefined;
}

interface PaddleSubscriptionCancelledPayload extends PaddleWebhookPayload {
  subscription_id: string;
  status: string;
  [key: string]: string | number | boolean | undefined;
}

interface PaddlePaymentSucceededPayload extends PaddleWebhookPayload {
  order_id: string;
  amount: string;
  currency: string;
  [key: string]: string | number | boolean | undefined;
}

interface PaddlePaymentRefundedPayload extends PaddleWebhookPayload {
  order_id: string;
  amount_refunded: string;
  [key: string]: string | number | boolean | undefined;
}

// Paddle webhook handler
export async function handler(event: WebhookEvent, context: WebhookContext): Promise<WebhookResponse> {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, paddle-signature',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Get the signature from headers
    const signature = event.headers['paddle-signature'] || event.headers['Paddle-Signature'];
    const rawBody = event.body;

    if (!signature) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing paddle-signature header' }),
      };
    }

    // Parse the webhook payload
    const payload: PaddleWebhookPayload = JSON.parse(rawBody);
    
    // Verify the webhook signature using the Paddle public key
    const publicKey = process.env.PADDLE_PUBLIC_KEY || '';
    if (!verifyPaddleWebhook(rawBody, signature, publicKey)) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid webhook signature' }),
      };
    }
    
    // Handle different webhook events
    switch (payload.alert_name) {
      case 'product_created':
        // Handle product creation
        await handleProductCreated(payload as PaddleProductCreatedPayload);
        break;
        
      case 'product_updated':
        // Handle product update
        await handleProductUpdated(payload as PaddleProductUpdatedPayload);
        break;
        
      case 'product_deleted':
        // Handle product deletion
        await handleProductDeleted(payload as PaddleProductDeletedPayload);
        break;
        
      case 'subscription_created':
        // Handle subscription creation
        await handleSubscriptionCreated(payload as PaddleSubscriptionCreatedPayload);
        break;
        
      case 'subscription_updated':
        // Handle subscription update
        await handleSubscriptionUpdated(payload as PaddleSubscriptionUpdatedPayload);
        break;
        
      case 'subscription_cancelled':
        // Handle subscription cancellation
        await handleSubscriptionCancelled(payload as PaddleSubscriptionCancelledPayload);
        break;
        
      case 'payment_succeeded':
        // Handle successful payment
        await handlePaymentSucceeded(payload as PaddlePaymentSucceededPayload);
        break;
        
      case 'payment_refunded':
        // Handle refunded payment
        await handlePaymentRefunded(payload as PaddlePaymentRefundedPayload);
        break;
        
      default:
        console.log('Unhandled Paddle webhook event:', payload.alert_name);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error processing Paddle webhook:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}

// Handle product creation webhook
async function handleProductCreated(payload: PaddleProductCreatedPayload) {
  console.log('Handling product created webhook:', payload);
  
  // In a real implementation, you would:
  // 1. Update the corresponding course/ebook in Strapi with the Paddle product ID
  // 2. Update any related data in your system
  
  // Example of what you might do:
  // const productId = payload.product_id;
  // const productName = payload.product_name;
  // 
  // // Find and update the corresponding item in Strapi
  // // This would depend on how you're mapping Paddle products to your content
  // await strapiApi.updateCourseByPaddleId(productId, { 
  //   PaddleProductID: productId,
  //   status: 'published'
  // });
}

// Handle product update webhook
async function handleProductUpdated(payload: PaddleProductUpdatedPayload) {
  console.log('Handling product updated webhook:', payload);
  
  // Similar to product creation, but for updates
}

// Handle product deletion webhook
async function handleProductDeleted(payload: PaddleProductDeletedPayload) {
  console.log('Handling product deleted webhook:', payload);
  
  // Handle product deletion
}

// Handle subscription creation webhook
async function handleSubscriptionCreated(payload: PaddleSubscriptionCreatedPayload) {
  console.log('Handling subscription created webhook:', payload);
  
  // Handle new subscription
}

// Handle subscription update webhook
async function handleSubscriptionUpdated(payload: PaddleSubscriptionUpdatedPayload) {
  console.log('Handling subscription updated webhook:', payload);
  
  // Handle subscription update
}

// Handle subscription cancellation webhook
async function handleSubscriptionCancelled(payload: PaddleSubscriptionCancelledPayload) {
  console.log('Handling subscription cancelled webhook:', payload);
  
  // Handle subscription cancellation
}

// Handle successful payment webhook
async function handlePaymentSucceeded(payload: PaddlePaymentSucceededPayload) {
  console.log('Handling payment succeeded webhook:', payload);
  
  // Handle successful payment
  // This might involve:
  // 1. Creating a purchase record in Strapi
  // 2. Granting access to the purchased content
  // 3. Sending confirmation emails
}

// Handle refunded payment webhook
async function handlePaymentRefunded(payload: PaddlePaymentRefundedPayload) {
  console.log('Handling payment refunded webhook:', payload);
  
  // Handle refunded payment
  // This might involve:
  // 1. Updating purchase records in Strapi
  // 2. Revoking access to content
  // 3. Sending notification emails
}