
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileNavBar from '@/components/MobileNavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Legal = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-12">Legal Information</h1>
          
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Terms of Service</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  By using Taskmason, you agree to comply with and be bound by the following terms and conditions.
                </p>
                <h3 className="text-lg font-semibold text-white">User Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Provide accurate and truthful information</li>
                  <li>Respect other users and maintain professional conduct</li>
                  <li>Protect your account credentials</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
                <h3 className="text-lg font-semibold text-white">Platform Usage</h3>
                <p>
                  Our platform is designed for educational and professional development purposes. 
                  Any misuse of the platform may result in account suspension or termination.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  We are committed to protecting your privacy and ensuring the security of your personal information.
                </p>
                <h3 className="text-lg font-semibold text-white">Information We Collect</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Account information (name, email, profile details)</li>
                  <li>Learning progress and activity data</li>
                  <li>Communication preferences</li>
                  <li>Usage analytics for platform improvement</li>
                </ul>
                <h3 className="text-lg font-semibold text-white">How We Use Your Information</h3>
                <p>
                  Your information is used to provide our services, improve user experience, 
                  and communicate important updates about your account and our platform.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Cookie Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  We use cookies to enhance your browsing experience and provide personalized content.
                </p>
                <h3 className="text-lg font-semibold text-white">Types of Cookies</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Essential cookies for platform functionality</li>
                  <li>Analytics cookies for usage insights</li>
                  <li>Preference cookies for personalization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  If you have any questions about these legal terms or need assistance, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> legal@taskmason.com</p>
                  <p><strong>Address:</strong> 123 Learning Street, Education City, EC 12345</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
      <MobileNavBar />
    </div>
  );
};

export default Legal;
