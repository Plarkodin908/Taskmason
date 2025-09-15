import React from 'react';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Legal = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Legal Information
            </h1>
            <p className="text-xl text-muted-foreground">
              Important legal documents and policies for Taskmason users.
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold mb-4 text-card-foreground">Privacy Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At Taskmason, we are committed to protecting your privacy. This Privacy Policy explains what data we collect, how we use it, and your rights regarding your personal information.
                </p>
                <h3 className="text-lg font-semibold text-card-foreground mt-6">Information We Collect</h3>
                <p>
                  We collect information you provide directly to us, such as when you create an account, purchase content, or communicate with us. This may include your name, email address, payment information, and any other information you choose to provide.
                </p>
                <p>
                  We also collect information automatically, such as your IP address, browser type, and usage data when you access our platform.
                </p>
                <h3 className="text-lg font-semibold text-card-foreground mt-6">How We Use Your Information</h3>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your transactions and send transaction confirmations</li>
                  <li>Communicate with you about your account and our services</li>
                  <li>Personalize your experience on our platform</li>
                  <li>Protect the security and integrity of our platform</li>
                </ul>
                <h3 className="text-lg font-semibold text-card-foreground mt-6">Data Sharing and Disclosure</h3>
                <p>
                  We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent. We may share information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                </p>
                <p>
                  We may also release information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold mb-4 text-card-foreground">Terms of Service</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  These Terms of Service govern your access to and use of the Taskmason platform. By accessing or using our services, you agree to be bound by these terms.
                </p>
                <h3 className="text-lg font-semibold text-card-foreground mt-6">Description of Service</h3>
                <p>
                  Taskmason is a digital learning platform that connects learners with educators to facilitate knowledge exchange and skill development. Our platform offers courses, e-books, and other educational content.
                </p>
                <h3 className="text-lg font-semibold text-card-foreground mt-6">User Accounts</h3>
                <p>
                  You may need to create an account to access certain features of our platform. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
                <h3 className="text-lg font-semibold text-card-foreground mt-6">Content Ownership</h3>
                <p>
                  All course content, e-books, and other materials available on our platform are owned by their respective creators or licensors. Digital content purchased on our platform is licensed, not sold, to you for personal use only.
                </p>
                <h3 className="text-lg font-semibold text-card-foreground mt-6">Refund Policy</h3>
                <p>
                  Our refund policy is described in detail in the Refund Policy section. Please review it carefully before making any purchases.
                </p>
                <h3 className="text-lg font-semibold text-card-foreground mt-6">Limitation of Liability</h3>
                <p>
                  Taskmason shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold mb-4 text-card-foreground">Refund Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We want you to be completely satisfied with your purchase. If you are not satisfied with the content you purchased, we offer refunds in accordance with this policy.
                </p>
                <h3 className="text-lg font-semibold text-card-foreground mt-6">Eligibility for Refunds</h3>
                <p>
                  You have 7 days from the date of purchase to request a refund for digital content. After 7 days, no refunds will be issued.
                </p>
                <p>
                  Refunds are only available for digital content that you have not substantially consumed. If you have completed more than 25% of a course or read more than 25% of an e-book, you are not eligible for a refund.
                </p>
                <h3 className="text-lg font-semibold text-card-foreground mt-6">How to Request a Refund</h3>
                <p>
                  To request a refund, please contact us at <Link to="mailto:contact@taskmason.web.app" className="text-blue-400 hover:underline">contact@taskmason.web.app</Link> with your order details and reason for the refund request. We will process your request within 5 business days.
                </p>
                <h3 className="text-lg font-semibold text-card-foreground mt-6">Non-Refundable Items</h3>
                <p>
                  The following items are not eligible for refunds:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Subscription fees for periods already elapsed</li>
                  <li>Content that has been substantially consumed (more than 25%)</li>
                  <li>Custom or personalized content</li>
                  <li>Free content or content received as part of a promotion</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold mb-4 text-card-foreground">Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about these legal documents or need assistance with any aspect of our service, please contact us:
                </p>
                <p>
                  Email: <Link to="mailto:contact@taskmason.web.app" className="text-blue-400 hover:underline">contact@taskmason.web.app</Link>
                </p>
                <p>
                  You can also use our contact form on the website to get in touch with our support team.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Legal;