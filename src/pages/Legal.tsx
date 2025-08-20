
import React from 'react';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
              Important legal documents and policies for TaskMason users.
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold mb-4 text-card-foreground">Terms of Service</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By using TaskMason, you agree to these terms of service. Please read them carefully.
                </p>
                <p>
                  Our platform is designed to facilitate learning and skill exchange. Users must be respectful 
                  and follow community guidelines at all times.
                </p>
                <p>
                  We reserve the right to modify these terms at any time. Users will be notified of significant changes.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold mb-4 text-card-foreground">Privacy Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Your privacy is important to us. We collect only the information necessary to provide our services.
                </p>
                <p>
                  We do not sell or share your personal information with third parties without your consent.
                </p>
                <p>
                  All data is stored securely and handled in accordance with industry best practices.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold mb-4 text-card-foreground">Cookie Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We use cookies to improve your experience on our platform and provide personalized content.
                </p>
                <p>
                  You can control cookie settings through your browser preferences.
                </p>
                <p>
                  Essential cookies are required for the platform to function properly.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold mb-4 text-card-foreground">Contact Us</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about these legal documents, please contact us at:
                </p>
                <p>
                  Email: legal@taskmason.com<br />
                  Address: 123 Learning Street, Education City, EC 12345
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
