import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Play, Download, Star, Users, Clock, Globe, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CryptoPaymentModal from '@/components/payment/CryptoPaymentModal';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCrypto, setShowCrypto] = useState(false);

  // Mock course data - in real app this would come from API
  const course = {
    id: 1,
    title: "Complete React Development Course",
    creator: {
      name: "Sarah Johnson",
      avatar: "/lovable-uploads/54ffc2eb-8b8d-4893-beca-68661a996ce4.png",
      bio: "Senior Frontend Developer with 8+ years experience building scalable web applications. Passionate about teaching modern JavaScript frameworks.",
      walletAddress: "TXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ" // Creator's wallet address
    },
    price: 89.99,
    duration: "12 hours",
    difficulty: "Intermediate",
    language: "English",
    rating: 4.8,
    students: 1247,
    videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
    thumbnail: "/lovable-uploads/44320338-928a-4f87-80c5-b108d09edc5e.png",
    description: "Master React from the ground up with this comprehensive course. Learn hooks, context, routing, and build real-world projects.",
    summary: "This comprehensive React course takes you from beginner to advanced level. You'll learn modern React concepts including hooks, context API, routing with React Router, state management, and build three real-world projects including a task manager, e-commerce app, and social media dashboard.",
    whatYouLearn: [
      "Master React Hooks (useState, useEffect, useContext, useReducer)",
      "Build responsive user interfaces with modern CSS techniques",
      "Implement routing and navigation with React Router",
      "Manage application state effectively",
      "Connect to REST APIs and handle async operations",
      "Deploy React applications to production"
    ],
    whoIsFor: [
      "JavaScript developers wanting to learn React",
      "Frontend developers looking to advance their skills",
      "Anyone interested in modern web development",
      "Students and professionals seeking to build interactive UIs"
    ],
    reviews: [
      {
        id: 1,
        user: "Michael Chen",
        avatar: "/lovable-uploads/61f28fcb-86e8-4209-8a5c-9863e40384ae.png",
        rating: 5,
        comment: "Excellent course! The projects are very practical and helped me land my first React job.",
        date: "2 weeks ago"
      },
      {
        id: 2,
        user: "Emma Wilson",
        avatar: "/lovable-uploads/609db0c7-2e29-405b-ad44-bee4b401e14e.png",
        rating: 4,
        comment: "Great explanation of React concepts. Could use more advanced topics but perfect for beginners.",
        date: "1 month ago"
      }
    ]
  };

  const otherCurrencies = [
    { code: 'EUR', symbol: '€', rate: 0.85, amount: (course.price * 0.85).toFixed(2) },
    { code: 'GBP', symbol: '£', rate: 0.73, amount: (course.price * 0.73).toFixed(2) },
    { code: 'CAD', symbol: 'C$', rate: 1.35, amount: (course.price * 1.35).toFixed(2) }
  ];

  const handleBuyNow = () => {
    navigate('/payment', { state: { courseId: course.id, price: course.price, title: course.title } });
  };

  const handleCryptoPay = () => {
    setShowCrypto(true);
  };

  const handleCryptoPaymentSuccess = () => {
    // In a real app, this would update the UI to show the course content
    navigate('/dashboard/my-courses');
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
            Back to Courses
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Header */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {course.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <img 
                      src={course.creator.avatar} 
                      alt={course.creator.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-white font-medium">{course.creator.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{course.students.toLocaleString()} students</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
                    <Clock className="h-3 w-3 mr-1" />
                    {course.duration}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-900/50 text-green-200">
                    {course.difficulty}
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-900/50 text-purple-200">
                    <Globe className="h-3 w-3 mr-1" />
                    {course.language}
                  </Badge>
                </div>
              </div>

              {/* Video Preview */}
              <Card className="bg-card border-border">
                <div className="aspect-video">
                  <iframe
                    src={course.videoUrl}
                    className="w-full h-full rounded-t-lg"
                    allowFullScreen
                    title="Course Preview"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Play className="h-4 w-4" />
                    Free preview - First minute of the course
                  </div>
                </div>
              </Card>

              {/* AI Summary */}
              <Card className="bg-card border-border p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Course Summary</h2>
                <p className="text-gray-300 leading-relaxed">{course.summary}</p>
              </Card>

              {/* What You'll Learn */}
              <Card className="bg-card border-border p-6">
                <h2 className="text-2xl font-bold text-white mb-4">What You'll Learn</h2>
                <ul className="space-y-3">
                  {course.whatYouLearn.map((item, index) => (
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
                  {course.whoIsFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Creator Bio */}
              <Card className="bg-card border-border p-6">
                <h2 className="text-2xl font-bold text-white mb-4">About the Instructor</h2>
                <div className="flex items-start gap-4">
                  <img 
                    src={course.creator.avatar} 
                    alt={course.creator.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{course.creator.name}</h3>
                    <p className="text-gray-300">{course.creator.bio}</p>
                  </div>
                </div>
              </Card>

              {/* Reviews */}
              <Card className="bg-card border-border p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Student Reviews</h2>
                <div className="space-y-6">
                  {course.reviews.map((review) => (
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
              {/* Purchase Section */}
              <Card className="p-6 bg-card border-border">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-card-foreground">${course.price}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {otherCurrencies.map((currency) => (
                        <Badge key={currency.code} variant="secondary" className="text-xs">
                          {currency.symbol}{currency.amount} {currency.code}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    onClick={handleBuyNow}
                    className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                  >
                    Buy Full Course
                  </Button>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleCryptoPay}
                    variant="outline" 
                    className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 w-full sm:w-auto"
                  >
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2 flex items-center justify-center">
                        <span className="text-black text-[8px] font-bold">USDT</span>
                      </div>
                      Pay with Crypto
                    </div>
                  </Button>
                  <Button variant="ghost" className="w-full sm:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Download Preview
                  </Button>
                </div>
              </Card>

              {/* Preview Quiz */}
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Sample Quiz Question</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">What is the primary purpose of React Hooks?</p>
                  <div className="space-y-2">
                    <div className="p-3 rounded border border-gray-600 text-gray-300 hover:border-blue-500 cursor-pointer transition-colors">
                      A) To replace class components entirely
                    </div>
                    <div className="p-3 rounded border border-gray-600 text-gray-300 hover:border-blue-500 cursor-pointer transition-colors">
                      B) To use state and lifecycle in functional components
                    </div>
                    <div className="p-3 rounded border border-gray-600 text-gray-300 hover:border-blue-500 cursor-pointer transition-colors">
                      C) To improve performance only
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Purchase the full course to access all quiz questions and get instant feedback!
                  </p>
                </div>
              </Card>

              {/* Downloadable Resource Preview */}
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Downloadable Resources</h3>
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded border border-gray-600">
                  <BookOpen className="h-8 w-8 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-white font-medium">React Cheat Sheet</p>
                    <p className="text-gray-400 text-sm">PDF • 2.5 MB</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  This is a preview. Full course includes 15+ downloadable resources.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      <CryptoPaymentModal 
        isOpen={showCrypto}
        onClose={() => setShowCrypto(false)}
        amount={course.price}
        currency="USDT"
        creatorWalletAddress={course.creator.walletAddress}
        onPaymentSuccess={handleCryptoPaymentSuccess}
      />
    </div>
  );
};

export default CourseDetail;