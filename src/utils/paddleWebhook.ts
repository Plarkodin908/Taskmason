// Utility function to verify Paddle webhook signatures
import { createHmac, createVerify } from 'crypto';

/**
 * Verifies a Paddle webhook signature using the Paddle public key
 * @param payload The raw webhook payload
 * @param signature The signature from the paddle-signature header
 * @param publicKey The Paddle public key
 * @returns Whether the signature is valid
 */
export function verifyPaddleWebhook(payload: string, signature: string, publicKey: string): boolean {
  try {
    // Create a verifier with the Paddle public key
    const verifier = createVerify('SHA1');
    verifier.update(payload);
    verifier.end();
    
    // Verify the signature
    return verifier.verify(publicKey, signature, 'base64');
  } catch (error) {
    console.error('Error verifying Paddle webhook signature:', error);
    return false;
  }
}

/**
 * Alternative verification method using HMAC (for legacy Paddle webhooks)
 * @param payload The raw webhook payload
 * @param signature The signature from the paddle-signature header
 * @param publicKey The Paddle public key
 * @returns Whether the signature is valid
 */
export function verifyPaddleWebhookHMAC(payload: string, signature: string, publicKey: string): boolean {
  try {
    // Create HMAC signature
    const hmac = createHmac('sha1', publicKey);
    hmac.update(payload);
    const expectedSignature = hmac.digest('hex');
    
    // Compare signatures
    return expectedSignature === signature;
  } catch (error) {
    console.error('Error verifying Paddle webhook signature with HMAC:', error);
    return false;
  }
}