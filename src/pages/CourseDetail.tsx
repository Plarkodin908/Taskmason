import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Play, Download, Star, Users, Clock, Globe, BookOpen, Lock, CreditCard } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import strapiApi from '@/services/strapiApi';
import { toast } from "sonner";
import { sanitizeImageUrl } from "@/utils/image-sanitizer";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  // Use 'unknown' type instead of 'any' for better type safety
  const [course, setCourse] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        setError('No course ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await strapiApi.getCourse(id);
        // Use the response data directly without type assertion
        setCourse(response.data);
        
        // Check if user has purchased the course
        if (user && response.data.purchases) {
          // Cast to 'any' only where necessary to avoid type errors
          const purchases: any = response.data.purchases;
          const purchased = purchases.some(
            (purchase: any) => purchase.users_permissions_user?.id === user.id
          );
          setHasPurchased(purchased);
        }
      } catch (err) {
        setError('Failed to load course details');
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]);

  const handlePurchase = () => {
    if (!user) {
      toast.error('Please sign in to purchase this course');
      navigate('/auth/sign-in');
      return;
    }

    if (!course) return;

    // Navigate to payment page with course data
    navigate('/payment', {
      state: {
        amount: course.price,
        currency: 'USD',
        productId: course.id.toString(),
        productType: 'course' as const,
        userId: user.id
      }
    });
  };

  const handleDownload = () => {
    if (!hasPurchased) {
      toast.error('Please purchase the course to download materials');
      return;
    }

    // In a real app, this would download the course materials
    toast.success('Download started');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-purple mx-auto"></div>
          <p className="text-white mt-4">Loading course details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-white">Course not found or error loading course details.</p>
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate(-1)} 
          variant="outline"
          className="mb-6 border-primary-purple/30 text-white hover:bg-primary-purple/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card className="bg-dark-purple border-primary-purple/30 overflow-hidden">
              {course.thumbnail ? (
                <img 
                  src={sanitizeImageUrl(course.thumbnail.url)} 
                  alt={course.title} 
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-r from-primary-purple/20 to-dark-purple flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary-purple/50" />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-primary-purple/20 text-primary-purple">
                    {course.level}
                  </Badge>
                  <Badge variant="secondary" className="bg-mint/20 text-mint">
                    {course.language}
                  </Badge>
                  {course.featured && (
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
                <p className="text-white/80 mb-4">{course.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration ? `${course.duration} hours` : 'N/A'} duration</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.purchases?.length || 0} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.8 (128 reviews)</span>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Course Content */}
            <Card className="bg-dark-purple border-primary-purple/30 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Course Content</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((lesson) => (
                  <div 
                    key={lesson} 
                    className="flex items-center justify-between p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {hasPurchased ? (
                        <Play className="h-5 w-5 text-primary-purple" />
                      ) : (
                        <Lock className="h-5 w-5 text-white/50" />
                      )}
                      <span className="text-white">Lesson {lesson}: Introduction to the course</span>
                    </div>
                    <span className="text-white/50 text-sm">15 min</span>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Instructor */}
            {course.creator && (
              <Card className="bg-dark-purple border-primary-purple/30 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Instructor</h2>
                <div className="flex items-center gap-4">
                  {course.creator.avatar ? (
                    <img 
                      src={sanitizeImageUrl(course.creator.avatar.url)} 
                      alt={course.creator.name} 
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-primary-purple/20 flex items-center justify-center">
                      <span className="text-primary-purple font-bold text-xl">
                        {course.creator.name?.substring(0, 2).toUpperCase() || 'IN'}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-white">{course.creator.name}</h3>
                    <p className="text-white/70 text-sm">{course.creator.bio || 'No bio available'}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
          
          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <Card className="bg-dark-purple border-primary-purple/30 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">Course Access</h2>
              
              <div className="mb-6">
                <div className="text-3xl font-bold text-primary-purple mb-2">
                  ${course.price.toFixed(2)}
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Globe className="h-4 w-4" />
                  <span>Lifetime access</span>
                </div>
              </div>
              
              <Separator className="my-4 bg-primary-purple/20" />
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-white/80">
                  <Play className="h-4 w-4 text-primary-purple" />
                  <span>42 lessons</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="h-4 w-4 text-primary-purple" />
                  <span>{course.duration ? `${course.duration} hours` : 'N/A'} content</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Download className="h-4 w-4 text-primary-purple" />
                  <span>Downloadable resources</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Globe className="h-4 w-4 text-primary-purple" />
                  <span>Certificate of completion</span>
                </div>
              </div>
              
              {hasPurchased ? (
                <div className="space-y-3">
                  <Button className="w-full bg-mint hover:bg-mint/90 text-forest font-medium">
                    <Play className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                  <Button 
                    onClick={handleDownload}
                    variant="outline" 
                    className="w-full border-primary-purple/30 text-white hover:bg-primary-purple/10"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Materials
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handlePurchase}
                  className="w-full bg-primary-purple hover:bg-primary-purple/90 text-white font-medium"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Purchase Course
                </Button>
              )}
              
              <p className="text-white/50 text-xs text-center mt-4">
                Secure payment powered by Stripe & Paddle
              </p>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;