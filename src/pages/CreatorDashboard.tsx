import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Video, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Download, 
  Eye, 
  MessageCircle, 
  Heart,
  Plus,
  BarChart3,
  FileText
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import strapiApi from '@/services/strapiApi';

const CreatorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'courses' | 'ebooks'>('courses');
  const [courses, setCourses] = useState<any[]>([]);
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    totalCourses: 0,
    totalEbooks: 0,
    totalStudents: 0,
    totalRevenue: 0,
    monthlyGrowth: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth/sign-in');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch creator's courses
        const coursesResponse: any = await strapiApi.getCourses();
        setCourses(coursesResponse.data || []);
        
        // Fetch creator's ebooks
        const ebooksResponse: any = await strapiApi.getEbooks();
        setEbooks(ebooksResponse.data || []);
        
        // Calculate earnings data
        const coursePurchases = coursesResponse.data?.flatMap((course: any) => course.purchases || []) || [];
        const ebookPurchases = ebooksResponse.data?.flatMap((ebook: any) => ebook.purchases || []) || [];
        const allPurchases = [...coursePurchases, ...ebookPurchases];
        
        const totalEarnings = allPurchases.reduce((sum, purchase) => sum + (purchase.amount || 0), 0);
        const monthlyEarnings = allPurchases
          .filter(purchase => {
            const purchaseDate = new Date(purchase.createdAt);
            const now = new Date();
            return purchaseDate.getMonth() === now.getMonth() && 
                   purchaseDate.getFullYear() === now.getFullYear();
          })
          .reduce((sum, purchase) => sum + (purchase.amount || 0), 0);
        
        const totalStudents = new Set(allPurchases.map(p => p.users_permissions_user?.id)).size;
        
        setStats({
          totalCourses: coursesResponse.data?.length || 0,
          totalEbooks: ebooksResponse.data?.length || 0,
          totalStudents,
          totalRevenue: totalEarnings,
          monthlyGrowth: monthlyEarnings
        });
      } catch (error) {
        console.error('Error fetching creator data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-white">Please sign in to access the creator dashboard.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Creator Dashboard</h1>
            <p className="text-white/70">Manage your content and track your earnings</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button 
              onClick={() => navigate('/course-creation')}
              className="bg-primary-purple hover:bg-primary-purple/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/ebook-creation')}
              className="border-primary-purple/30 text-white hover:bg-primary-purple/10"
            >
              <FileText className="h-4 w-4 mr-2" />
              Create Ebook
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-dark-purple border-primary-purple/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/70">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-white/60">All time</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-purple border-primary-purple/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/70">Monthly Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.monthlyGrowth.toFixed(2)}</div>
              <p className="text-xs text-white/60">This month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-purple border-primary-purple/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/70">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalStudents}</div>
              <p className="text-xs text-white/60">Active learners</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-purple border-primary-purple/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/70">Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalCourses}</div>
              <p className="text-xs text-white/60">Published</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-purple border-primary-purple/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/70">E-books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalEbooks}</div>
              <p className="text-xs text-white/60">Published</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Courses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Your Courses</h2>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/course-creation')}
                className="text-primary-purple hover:text-primary-purple/90 hover:bg-primary-purple/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Course
              </Button>
            </div>
            
            <div className="space-y-4">
              {courses.length > 0 ? (
                courses.map(course => (
                  <Card key={course.id} className="bg-dark-purple border-primary-purple/30">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {course.thumbnail ? (
                          <img 
                            src={course.thumbnail.url} 
                            alt={course.title} 
                            className="h-16 w-16 rounded object-cover"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded bg-primary-purple/20 flex items-center justify-center">
                            <Video className="h-6 w-6 text-primary-purple" />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-white">{course.title}</h3>
                            <Badge 
                              variant={course.status === "Published" ? "default" : "secondary"}
                              className={
                                course.status === "Published" ? "bg-mint/20 text-mint" : 
                                course.status === "Draft" ? "bg-yellow-500/20 text-yellow-500" : 
                                "bg-blue-500/20 text-blue-500"
                              }
                            >
                              {course.status}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-white/70 mt-1 line-clamp-2">
                            {course.description}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-4 text-sm text-white/70">
                              <span>${course.price.toFixed(2)}</span>
                              <span>{course.purchases?.length || 0} students</span>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigate(`/course/${course.id}`)}
                              className="text-primary-purple hover:text-primary-purple/90 hover:bg-primary-purple/10"
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-dark-purple border-primary-purple/30">
                  <CardContent className="p-8 text-center">
                    <Video className="h-12 w-12 text-white/30 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-1">No courses yet</h3>
                    <p className="text-white/70 mb-4">Create your first course to start sharing knowledge</p>
                    <Button 
                      onClick={() => navigate('/course-creation')}
                      className="bg-primary-purple hover:bg-primary-purple/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Course
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          {/* E-books */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Your E-books</h2>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/ebook-creation')}
                className="text-primary-purple hover:text-primary-purple/90 hover:bg-primary-purple/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                New E-book
              </Button>
            </div>
            
            <div className="space-y-4">
              {ebooks.length > 0 ? (
                ebooks.map(ebook => (
                  <Card key={ebook.id} className="bg-dark-purple border-primary-purple/30">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {ebook.CoverImage ? (
                          <img 
                            src={ebook.CoverImage.url} 
                            alt={ebook.title} 
                            className="h-16 w-16 rounded object-cover"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded bg-primary-purple/20 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary-purple" />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-white">{ebook.title}</h3>
                            <Badge 
                              variant="secondary"
                              className={
                                ebook.access === "Free" ? "bg-green-500/20 text-green-500" : 
                                ebook.access === "Paid" ? "bg-blue-500/20 text-blue-500" : 
                                "bg-purple-500/20 text-purple-500"
                              }
                            >
                              {ebook.access}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-white/70 mt-1 line-clamp-2">
                            {ebook.description}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-4 text-sm text-white/70">
                              <span>{ebook.purchases?.length || 0} readers</span>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigate(`/ebook/${ebook.id}`)}
                              className="text-primary-purple hover:text-primary-purple/90 hover:bg-primary-purple/10"
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-dark-purple border-primary-purple/30">
                  <CardContent className="p-8 text-center">
                    <FileText className="h-12 w-12 text-white/30 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-1">No e-books yet</h3>
                    <p className="text-white/70 mb-4">Create your first e-book to share your knowledge</p>
                    <Button 
                      onClick={() => navigate('/ebook-creation')}
                      className="bg-primary-purple hover:bg-primary-purple/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create E-book
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CreatorDashboard;