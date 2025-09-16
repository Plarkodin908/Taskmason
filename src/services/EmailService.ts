// EmailService.ts
// Service to handle email sending using Brevo (Sendinblue) API

// In a real implementation, these would come from environment variables
const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY || 'YOUR_BREVO_API_KEY';
const SENDER_EMAIL = import.meta.env.VITE_SENDER_EMAIL || 'noreply@taskmason.web.app';
const SENDER_NAME = import.meta.env.VITE_SENDER_NAME || 'TaskMason';

interface EmailOptions {
  to: string[];
  subject: string;
  htmlContent: string;
  textContent?: string;
}

interface BrevoResponse {
  messageId: string;
  messageIds: string[];
}

interface BrevoError {
  code: string;
  message: string;
}

class EmailService {
  private async sendEmail(options: EmailOptions): Promise<BrevoResponse> {
    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': BREVO_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: {
            name: SENDER_NAME,
            email: SENDER_EMAIL,
          },
          to: options.to.map(email => ({ email })),
          subject: options.subject,
          htmlContent: options.htmlContent,
          textContent: options.textContent,
        }),
      });

      if (!response.ok) {
        const errorData: BrevoError = await response.json();
        throw new Error(`Brevo API error: ${errorData.message}`);
      }

      const data: BrevoResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Email sending error:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<BrevoResponse> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6e44ff;">Welcome to TaskMason!</h1>
        <p>Hi ${name},</p>
        <p>Welcome to TaskMason! We're excited to have you join our community of learners and creators.</p>
        <p>Here's what you can do next:</p>
        <ul>
          <li>Browse our courses and e-books</li>
          <li>Create your profile</li>
          <li>Choose a subscription plan that fits your needs</li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Happy learning!</p>
        <p>The TaskMason Team</p>
      </div>
    `;

    return this.sendEmail({
      to: [email],
      subject: 'Welcome to TaskMason!',
      htmlContent,
    });
  }

  async sendVerificationEmail(email: string, name: string): Promise<BrevoResponse> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6e44ff;">Verify Your Email Address</h1>
        <p>Hi ${name},</p>
        <p>Thank you for signing up with TaskMason. To complete your registration, please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://taskmason.web.app/verify-email?token=verification_token_here" 
             style="background-color: #6e44ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>If you didn't create an account with us, please ignore this email.</p>
        <p>Best regards,<br>The TaskMason Team</p>
      </div>
    `;

    return this.sendEmail({
      to: [email],
      subject: 'Verify Your Email Address',
      htmlContent,
    });
  }

  async sendPasswordResetEmail(email: string, name: string, resetToken: string): Promise<BrevoResponse> {
    const resetUrl = `https://taskmason.web.app/auth/password-reset?token=${resetToken}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6e44ff;">Password Reset Request</h1>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #6e44ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.</p>
        <p>Best regards,<br>The TaskMason Team</p>
      </div>
    `;

    return this.sendEmail({
      to: [email],
      subject: 'Reset Your Password',
      htmlContent,
    });
  }

  async sendCoursePurchaseConfirmation(
    email: string, 
    name: string, 
    courseTitle: string, 
    amount: number
  ): Promise<BrevoResponse> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6e44ff;">Course Purchase Confirmation</h1>
        <p>Hi ${name},</p>
        <p>Thank you for purchasing "${courseTitle}"!</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>Order Details:</h3>
          <p><strong>Course:</strong> ${courseTitle}</p>
          <p><strong>Amount Paid:</strong> $${amount.toFixed(2)}</p>
        </div>
        <p>You can now access the course content in your dashboard.</p>
        <p>Happy learning!</p>
        <p>The TaskMason Team</p>
      </div>
    `;

    return this.sendEmail({
      to: [email],
      subject: `Purchase Confirmation: ${courseTitle}`,
      htmlContent,
    });
  }

  async sendCreatorPayoutNotification(
    email: string, 
    name: string, 
    amount: number, 
    method: string
  ): Promise<BrevoResponse> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6e44ff;">Payout Processed</h1>
        <p>Hi ${name},</p>
        <p>Great news! A payout has been processed to your account.</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>Payout Details:</h3>
          <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> ${method}</p>
          <p><strong>Status:</strong> Processed</p>
        </div>
        <p>The funds should appear in your account within 1-3 business days.</p>
        <p>Thank you for being a part of TaskMason!</p>
        <p>The TaskMason Team</p>
      </div>
    `;

    return this.sendEmail({
      to: [email],
      subject: 'Payout Processed',
      htmlContent,
    });
  }
}

export default new EmailService();