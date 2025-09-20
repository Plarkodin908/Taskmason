import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Download, 
  Star, 
  Users, 
  FileText, 
  Globe,
  BookOpen,
  Lock,
  CreditCard
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CryptoPaymentModal from '@/components/payment/CryptoPaymentModal';
import { useAuth } from '@/contexts/AuthContext';
import strapiApi from '@/services/strapiApi';
import { toast } from 'sonner';

const EbookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ebook, setEbook] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);

  useEffect(() => {
    const fetchEbook = async () => {
      if (!id) {
        setError('Ebook ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await strapiApi.getEbook(id);
        setEbook(response.data);
        
        // Check if user has access to the ebook
        if (user) {
          if (response.data.access === "Free") {
            setHasAccess(true);
          } else if (response.data.access === "Premium" && user.membership !== "Free") {
            setHasAccess(true);
          } else {
            // Check if user has purchased this ebook
            // In a real app, you would check the user's purchases
            setHasAccess(false);
          }
        } else {
          setHasAccess(response.data.access === "Free");
        }
      } catch (err) {
        setError('Failed to load ebook details');
        console.error('Error fetching ebook:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEbook();
  }, [id, user]);

  const handlePurchase = () => {
    if (!user) {
      toast.error('Please sign in to access this ebook');
      navigate('/auth/sign-in');
      return;
    }

    if (!ebook) return;

    // Navigate to payment page with ebook data
    navigate('/payment', {
      state: {
        amount: 9.99, // Would come from ebook data in real app
        currency: 'USD',
        productId: ebook.id.toString(),
        productType: 'ebook' as const,
        userId: user.id
      }
    });
  };

  const handleDownload = () => {
    if (!hasAccess) {
      toast.error('Please purchase the ebook to download');
      return;
    }

    if (!ebook?.file?.[0]?.url) {
      toast.error('No download file available');
      return;
    }

    // In a real app, this would download the ebook file
    const link = document.createElement('a');
    link.href = ebook.file[0].url;
    link.download = ebook.file[0].name || 'ebook.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Download started');
  };

  const handleCryptoPay = () => {
    setIsCryptoModalOpen(true);
  };

  const handleCryptoPaymentSuccess = () => {
    // In a real app, this would update the UI to show the ebook content
    navigate('/dashboard/my-ebooks');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-purple mx-auto"></div>
          <p className="text-white mt-4">Loading ebook details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !ebook) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-white">Ebook not found or error loading ebook details.</p>
          <Button 
            onClick={() => navigate(-1)} 
            className="mt-4 bg-primary-purple hover:bg-primary-purple/90"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate(-1)} 
          variant="outline"
          className="mb-6 border-primary-purple/30 text-white hover:bg-primary-purple/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Ebooks
        </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ebook Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ebook Header */}
              <Card className="bg-dark-purple border-primary-purple/30 overflow-hidden">
                {ebook.CoverImage ? (
                  <img 
                    src={ebook.CoverImage.url} 
                    alt={ebook.title} 
                    className="w-full h-80 object-cover"
                  />
                ) : (
                  <div className="w-full h-80 bg-gradient-to-r from-primary-purple/20 to-dark-purple flex items-center justify-center">
                    <BookOpen className="h-20 w-20 text-primary-purple/50" />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-primary-purple/20 text-primary-purple">
                      Ebook
                    </Badge>
                    <Badge variant="secondary" className="bg-mint/20 text-mint">
                      {ebook.access || 'Free'}
                    </Badge>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-white mb-2">{ebook.title}</h1>
                  <p className="text-white/80 mb-4">{ebook.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{ebook.pages || 'N/A'} pages</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>1,245 readers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>4.7 (89 reviews)</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Ebook Preview */}
              <Card className="bg-dark-purple border-primary-purple/30 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
                <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-12 w-12 text-white/50" />
                  <span className="ml-2 text-white/50">Ebook Preview</span>
                </div>
              </Card>
              
              {/* Author */}
              {ebook.author && (
                <Card className="bg-dark-purple border-primary-purple/30 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Author</h2>
                  <div className="flex items-center gap-4">
                    {ebook.author.avatar ? (
                      <img 
                        src={ebook.author.avatar.url} 
                        alt={ebook.author.name} 
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-primary-purple/20 flex items-center justify-center">
                        <span className="text-primary-purple font-bold text-xl">
                          {ebook.author.name?.substring(0, 2).toUpperCase() || 'AU'}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-white">{ebook.author.name}</h3>
                      <p className="text-white/70 text-sm">{ebook.author.bio || 'No bio available'}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Preview Pages */}
              <Card className="bg-card border-border p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Preview (First 5 Pages)</h2>
                <div className="bg-gray-800 rounded-lg p-6 max-h-96 overflow-y-auto">
                  <div className="space-y-6 text-gray-300">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Table of Contents</h3>
                      <ul className="space-y-2 text-sm">
                        {ebook.tableOfContents.slice(0, 4).map((chapter, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{chapter}</span>
                            <span className="text-gray-500">{(index + 1) * 25}</span>
                          </li>
                        ))}
                        <li className="text-gray-500">... and 4 more chapters</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Chapter 1: JavaScript Fundamentals</h3>
                      <p className="mb-4">
                        JavaScript is the language of the web, powering interactive websites and modern web applications. 
                        In this comprehensive guide, we'll explore everything from basic syntax to advanced concepts...
                      </p>
                      <p className="mb-4">
                        Whether you're just starting your programming journey or looking to enhance your existing skills, 
                        this book provides practical examples and real-world scenarios that you can apply immediately.
                      </p>
                      <p className="text-center text-gray-500 py-4">
                        --- Preview ends here ---<br/>
                        Purchase the full e-book to continue reading
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* AI Summary */}
              <Card className="bg-card border-border p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Book Summary</h2>
                <p className="text-gray-300 leading-relaxed">{ebook.summary}</p>
              </Card>

              {/* What You'll Learn */}
              <Card className="bg-card border-border p-6">
                <h2 className="text-2xl font-bold text-white mb-4">What You'll Learn</h2>
                <ul className="space-y-3">
                  {ebook.whatYouLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Who This Is For */}
              <Card className="bg-card border-border p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Who This Is For</h2>
                <ul className="space-y-3">
                  {ebook.whoIsFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>


              {/* Reviews */}
              <Card className="bg-card border-border p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Reader Reviews</h2>
                <div className="space-y-6">
                  {ebook.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-700 pb-6 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <img 
                          src={review.avatar} 
                          alt={review.user}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-white">{review.user}</h4>
                            <div className="flex items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-gray-400 text-sm">{review.date}</span>
                          </div>
                          <p className="text-gray-300">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            {/* Access Card */}
            <div className="lg:col-span-1">
              <Card className="bg-dark-purple border-primary-purple/30 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-4">Ebook Access</h2>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary-purple mb-2">
                    {ebook.access === "Free" ? "Free" : "$9.99"}
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Globe className="h-4 w-4" />
                    <span>Lifetime access</span>
                  </div>
                </div>
                
                <Separator className="my-4 bg-primary-purple/20" />
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-white/80">
                    <FileText className="h-4 w-4 text-primary-purple" />
                    <span>{ebook.pages || 'N/A'} pages</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Download className="h-4 w-4 text-primary-purple" />
                    <span>Downloadable PDF</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Globe className="h-4 w-4 text-primary-purple" />
                    <span>Read on any device</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <BookOpen className="h-4 w-4 text-primary-purple" />
                    <span>Searchable content</span>
                  </div>
                </div>
                
                {hasAccess ? (
                  <Button 
                    onClick={handleDownload}
                    className="w-full bg-mint hover:bg-mint/90 text-forest font-medium"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Ebook
                  </Button>
                ) : (
                  <Button 
                    onClick={handlePurchase}
                    className="w-full bg-primary-purple hover:bg-primary-purple/90 text-white font-medium"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    {ebook.access === "Premium" ? "Get Premium to Access" : "Purchase Ebook"}
                  </Button>
                )}
                
                <p className="text-white/50 text-xs text-center mt-4">
                  Secure payment powered by Stripe & Paddle
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      <CryptoPaymentModal 
        isOpen={isCryptoModalOpen}
        onClose={() => setIsCryptoModalOpen(false)}
        amount={ebook.price}
        currency="USDT"
        productId={ebook.id}
        productType="ebook"
        userId={user?.id || ''}
        onPaymentSuccess={handleCryptoPaymentSuccess}
      />
    </>
  );
};

export default EbookDetail;