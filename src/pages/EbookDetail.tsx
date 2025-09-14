import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, Star, Users, FileText, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const EbookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCrypto, setShowCrypto] = useState(false);

  // Mock ebook data
  const ebook = {
    id: 1,
    title: "Complete Guide to Modern JavaScript",
    author: {
      name: "David Rodriguez",
      avatar: "/lovable-uploads/67d1f40f-f60d-4221-9678-1e516ed84424.png",
      bio: "JavaScript expert and technical author with 10+ years of experience. Author of 5 programming books."
    },
    price: 24.99,
    pages: 340,
    fileSize: "8.5 MB",
    format: "PDF",
    language: "English",
    rating: 4.9,
    downloads: 2847,
    cover: "/lovable-uploads/79bf9c55-24c6-4feb-84ff-310a64214018.png",
    description: "Master modern JavaScript with this comprehensive guide covering ES6+, async programming, modules, and best practices.",
    summary: "This comprehensive JavaScript guide takes you from fundamentals to advanced concepts. Learn ES6+ features, async/await, modules, testing, and modern development practices. Includes practical examples and real-world projects.",
    whatYouLearn: [
      "ES6+ features and modern syntax",
      "Asynchronous programming with Promises and async/await",
      "Module systems and bundling",
      "Testing with Jest and other frameworks",
      "Performance optimization techniques",
      "Best practices and design patterns"
    ],
    whoIsFor: [
      "Beginner to intermediate JavaScript developers",
      "Frontend developers wanting to modernize their skills",
      "Backend developers learning Node.js",
      "Anyone preparing for JavaScript interviews"
    ],
    tableOfContents: [
      "Chapter 1: JavaScript Fundamentals",
      "Chapter 2: ES6+ Features",
      "Chapter 3: Asynchronous Programming",
      "Chapter 4: Working with APIs",
      "Chapter 5: Module Systems",
      "Chapter 6: Testing Your Code",
      "Chapter 7: Performance & Optimization",
      "Chapter 8: Modern Development Workflow"
    ],
    reviews: [
      {
        id: 1,
        user: "Alex Thompson",
        avatar: "/lovable-uploads/971a0525-9509-4c96-9f90-66e481b188bc.png",
        rating: 5,
        comment: "Incredibly detailed and well-structured. This book helped me land my current job!",
        date: "1 week ago"
      },
      {
        id: 2,
        user: "Lisa Chang",
        avatar: "/lovable-uploads/aaa9c8ad-47c0-4ec1-b299-8b47f30da290.png",
        rating: 5,
        comment: "The examples are practical and the explanations are clear. Highly recommended!",
        date: "3 weeks ago"
      }
    ]
  };

  const otherCurrencies = [
    { code: 'EUR', symbol: '€', rate: 0.85, amount: (ebook.price * 0.85).toFixed(2) },
    { code: 'GBP', symbol: '£', rate: 0.73, amount: (ebook.price * 0.73).toFixed(2) },
    { code: 'CAD', symbol: 'C$', rate: 1.35, amount: (ebook.price * 1.35).toFixed(2) }
  ];

  const handleBuyNow = () => {
    navigate('/payment', { state: { ebookId: ebook.id, price: ebook.price, title: ebook.title } });
  };

  const handleCryptoPay = () => {
    setShowCrypto(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="outline" 
            className="mb-6 text-white border-white/20 hover:bg-white/10"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to E-books
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* E-book Header */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {ebook.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <img 
                      src={ebook.author.avatar} 
                      alt={ebook.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-white font-medium">{ebook.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white">{ebook.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{ebook.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
                    <FileText className="h-3 w-3 mr-1" />
                    {ebook.pages} pages
                  </Badge>
                  <Badge variant="secondary" className="bg-green-900/50 text-green-200">
                    {ebook.format} • {ebook.fileSize}
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-900/50 text-purple-200">
                    <Globe className="h-3 w-3 mr-1" />
                    {ebook.language}
                  </Badge>
                </div>
              </div>

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

              {/* Author Bio */}
              <Card className="bg-card border-border p-6">
                <h2 className="text-2xl font-bold text-white mb-4">About the Author</h2>
                <div className="flex items-start gap-4">
                  <img 
                    src={ebook.author.avatar} 
                    alt={ebook.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{ebook.author.name}</h3>
                    <p className="text-gray-300">{ebook.author.bio}</p>
                  </div>
                </div>
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

            {/* Sidebar */}
            <div className="space-y-6">
              {/* E-book Cover & Purchase */}
              <Card className="bg-card border-border p-6 sticky top-24">
                <div className="text-center mb-6">
                  <img 
                    src={ebook.cover} 
                    alt={ebook.title}
                    className="w-48 h-64 object-cover rounded-lg mx-auto mb-4 shadow-lg"
                  />
                  <div className="text-3xl font-bold text-white mb-2">
                    ${ebook.price}
                  </div>
                  <div className="text-sm text-gray-400 space-y-1">
                    {otherCurrencies.map((currency) => (
                      <div key={currency.code}>
                        {currency.symbol}{currency.amount} {currency.code}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleBuyNow}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Full E-book
                  </Button>
                  
                  <Button 
                    onClick={handleCryptoPay}
                    variant="outline" 
                    className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                  >
                    Pay with Crypto
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pages:</span>
                    <span className="text-white">{ebook.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Format:</span>
                    <span className="text-white">{ebook.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">File Size:</span>
                    <span className="text-white">{ebook.fileSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Language:</span>
                    <span className="text-white">{ebook.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Downloads:</span>
                    <span className="text-white">{ebook.downloads.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Crypto Payment Modal */}
          {showCrypto && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="bg-card border-border p-6 max-w-md w-full">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Pay with Crypto</h3>
                  <p className="text-gray-400">Send exactly ${ebook.price} USDT (TRC20) to:</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded mb-4">
                  <p className="text-xs text-gray-300 break-all font-mono">
                    TQn9Y2khEsLMWwZHZHj6NeR8kZCKtDTK7k
                  </p>
                </div>
                
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-400">
                    Your payment will be confirmed automatically within 60 seconds
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button onClick={() => setShowCrypto(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    I've Sent Payment
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EbookDetail;