
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ShieldCheck, FileText, Lock, HelpCircle } from "lucide-react";

const Legal = () => {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-mint/20 to-sage/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-lavender/15 to-mint/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-sage/10 to-mint/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-10 w-28 h-28 bg-gradient-to-r from-mint/20 to-lavender/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-r from-sage/15 to-mint/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="relative">
            <h1 className="text-6xl font-bold mb-8 animate-fade-in bg-gradient-to-r from-white via-mint to-sage bg-clip-text text-transparent">
              Legal Information
            </h1>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-mint to-sage rounded-full animate-pulse"></div>
          </div>
          <p className="text-xl text-white/80 mb-12 animate-fade-in leading-relaxed max-w-3xl mx-auto" style={{ animationDelay: "200ms" }}>
            We're committed to transparency and protecting your rights. Review our comprehensive legal documentation below to understand how we handle your data and provide our services.
          </p>
        </div>
      </section>
      
      {/* Legal Tabs */}
      <section className="py-12 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-gradient-to-br from-forest-light/90 to-forest/80 border border-mint/20 backdrop-blur-sm shadow-2xl">
            <div className="p-8">
              <Tabs defaultValue="terms" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-12 bg-forest/50 backdrop-blur-sm border border-mint/10 rounded-xl p-2">
                  <TabsTrigger 
                    value="terms" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-mint data-[state=active]:to-sage data-[state=active]:text-forest transition-all duration-300 rounded-lg py-4 px-6"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <FileText className="h-6 w-6" />
                      <span className="font-medium">Terms of Service</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="privacy" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-mint data-[state=active]:to-sage data-[state=active]:text-forest transition-all duration-300 rounded-lg py-4 px-6"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Lock className="h-6 w-6" />
                      <span className="font-medium">Privacy Policy</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="cookies" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-mint data-[state=active]:to-sage data-[state=active]:text-forest transition-all duration-300 rounded-lg py-4 px-6"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <ShieldCheck className="h-6 w-6" />
                      <span className="font-medium">Cookie Policy</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="faq" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-mint data-[state=active]:to-sage data-[state=active]:text-forest transition-all duration-300 rounded-lg py-4 px-6"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <HelpCircle className="h-6 w-6" />
                      <span className="font-medium">FAQ</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="terms" className="mt-0">
                  <div className="bg-gradient-to-br from-forest-light/50 to-forest/30 rounded-xl p-8 border border-mint/10 backdrop-blur-sm">
                    <h2 className="text-3xl font-bold mb-6 text-white">Terms of Service</h2>
                    <div className="space-y-8 text-white/90 leading-relaxed">
                      <p className="text-white/70 text-sm">Last updated: June 1, 2023</p>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">1. Acceptance of Terms</h3>
                          <p className="mb-4 leading-7">
                            By accessing or using TASKMASON, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">2. User Accounts</h3>
                          <p className="mb-4 leading-7">
                            When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">3. Content and Conduct</h3>
                          <p className="mb-4 leading-7">
                            You may post, upload, or share content on TASKMASON, provided that you have the necessary rights to do so. You retain ownership of your content, but grant TASKMASON a license to use, reproduce, and display it in connection with the service.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">4. Educational Content</h3>
                          <p className="mb-4 leading-7">
                            TASKMASON provides a platform for sharing educational content. We do not guarantee the accuracy, completeness, or usefulness of any information provided by users or content creators.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">5. Termination</h3>
                          <p className="leading-7">
                            We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="privacy" className="mt-0">
                  <div className="bg-gradient-to-br from-forest-light/50 to-forest/30 rounded-xl p-8 border border-mint/10 backdrop-blur-sm">
                    <h2 className="text-3xl font-bold mb-6 text-white">Privacy Policy</h2>
                    <div className="space-y-8 text-white/90 leading-relaxed">
                      <p className="text-white/70 text-sm">Last updated: June 1, 2023</p>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">1. Information We Collect</h3>
                          <p className="mb-4 leading-7">
                            We collect information you provide directly to us when you create an account, update your profile, or communicate with us. This may include your name, email address, and other contact information.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">2. How We Use Your Information</h3>
                          <p className="mb-4 leading-7">
                            We use the information we collect to provide, maintain, and improve our services, to process transactions, send communications, and for authentication and security purposes.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">3. Information Sharing</h3>
                          <p className="mb-4 leading-7">
                            We may share your information with third-party service providers who perform services on our behalf, such as payment processing or data analysis. We may also share information if required by law.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">4. Data Security</h3>
                          <p className="mb-4 leading-7">
                            We take measures to help protect your personal information from loss, theft, misuse, and unauthorized access. However, no security system is impenetrable, and we cannot guarantee the security of your information.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">5. Your Choices</h3>
                          <p className="leading-7">
                            You may update, correct, or delete your account information at any time by logging into your account settings. You may also opt out of receiving promotional communications from us.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="cookies" className="mt-0">
                  <div className="bg-gradient-to-br from-forest-light/50 to-forest/30 rounded-xl p-8 border border-mint/10 backdrop-blur-sm">
                    <h2 className="text-3xl font-bold mb-6 text-white">Cookie Policy</h2>
                    <div className="space-y-8 text-white/90 leading-relaxed">
                      <p className="text-white/70 text-sm">Last updated: June 1, 2023</p>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">1. What Are Cookies</h3>
                          <p className="mb-4 leading-7">
                            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">2. How We Use Cookies</h3>
                          <p className="mb-4 leading-7">
                            We use cookies to understand how you interact with our website, to remember your preferences, and to improve your overall experience. We also use cookies to help display relevant advertisements and track the performance of our marketing efforts.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">3. Types of Cookies We Use</h3>
                          <div className="mb-4 leading-7 space-y-3">
                            <p><strong className="text-sage">Essential cookies:</strong> These are necessary for the website to function properly.</p>
                            <p><strong className="text-sage">Analytical/performance cookies:</strong> These help us understand how visitors interact with our website.</p>
                            <p><strong className="text-sage">Functionality cookies:</strong> These allow the website to remember choices you make and provide enhanced features.</p>
                            <p><strong className="text-sage">Targeting cookies:</strong> These record your visit to our website, the pages you visit, and the links you follow.</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-mint">4. Managing Cookies</h3>
                          <p className="leading-7">
                            Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience of the website and services we are able to offer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="faq" className="mt-0">
                  <div className="bg-gradient-to-br from-forest-light/50 to-forest/30 rounded-xl p-8 border border-mint/10 backdrop-blur-sm">
                    <h2 className="text-3xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                      {[
                        {
                          question: "How can I delete my account?",
                          answer: "You can delete your account by going to your account settings and selecting the 'Delete Account' option. Please note that this action is irreversible and all your data will be permanently removed."
                        },
                        {
                          question: "What happens to my courses if I cancel my subscription?",
                          answer: "If you cancel your educator subscription, your courses will remain on the platform but will be set to 'draft' mode after 30 days. Learners who have already enrolled will maintain access to the content."
                        },
                        {
                          question: "How do I report inappropriate content?",
                          answer: "You can report inappropriate content by clicking the 'Report' button on any course, comment, or message. Our moderation team reviews all reports within 24 hours."
                        },
                        {
                          question: "Can I transfer my subscription to someone else?",
                          answer: "Subscriptions are non-transferable between accounts. Each user must maintain their own subscription for access to premium features."
                        },
                        {
                          question: "How are disputes between users handled?",
                          answer: "We have a dedicated team to mediate disputes between users. Please contact support@taskmason.com with details of the issue, and we'll work to find a fair resolution."
                        }
                      ].map((faq, index) => (
                        <Card key={index} className="bg-gradient-to-r from-forest/80 to-forest-light/60 border border-mint/20 p-6 hover:border-mint/30 transition-all duration-300 hover:shadow-lg backdrop-blur-sm">
                          <h3 className="text-lg font-bold mb-3 text-sage">{faq.question}</h3>
                          <p className="text-white/80 leading-7">{faq.answer}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-forest/40 to-forest-light/30 backdrop-blur-sm relative">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Need Further Assistance?</h2>
          <p className="text-white/70 mb-10 max-w-2xl mx-auto text-lg leading-7">
            Our legal team is available to answer any questions you may have regarding our terms, privacy practices, or other legal concerns.
          </p>
          <Link to="/company" className="inline-block">
            <button className="bg-gradient-to-r from-mint to-sage hover:from-mint/90 hover:to-sage/90 text-forest px-10 py-4 rounded-xl font-semibold hover-scale transition-all duration-300 shadow-lg hover:shadow-xl">
              Contact Legal Team
            </button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default Legal;
