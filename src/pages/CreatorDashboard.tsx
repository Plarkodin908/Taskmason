import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, DollarSign, Users, Eye, MessageSquare, TrendingUp, FileText, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPayout, setSelectedPayout] = useState('wise');

  // Mock data for creator
  const creatorStats = {
    totalEarnings: 2847.50,
    pendingPayout: 847.25,
    totalStudents: 1247,
    totalViews: 15623,
    avgCompletion: 78
  };

  const myCourses = [
    {
      id: 1,
      title: "Complete React Development Course",
      status: "Published",
      students: 1247,
      earnings: 1899.50,
      rating: 4.8,
      views: 5234,
      completionRate: 82
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      status: "Published", 
      students: 892,
      earnings: 948.00,
      rating: 4.6,
      views: 3421,
      completionRate: 75
    },
    {
      id: 3,
      title: "Advanced CSS Techniques",
      status: "Pending Review",
      students: 0,
      earnings: 0,
      rating: 0,
      views: 0,
      completionRate: 0
    }
  ];

  const messages = [
    {
      id: 1,
      student: "Alex Chen",
      course: "Complete React Development Course",
      message: "Hi! I'm having trouble with the useEffect hook in lesson 5...",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      student: "Sarah Johnson",
      course: "JavaScript Fundamentals",
      message: "Thank you for the great course! Could you recommend...",
      time: "1 day ago",
      unread: false
    }
  ];

  const handleCreateCourse = () => {
    if (user && user.membership === "Educator") {
      navigate("/course-creation");
    } else {
      toast.info("Creating courses requires an Educator membership", {
        description: "Upgrade your plan to unlock this feature",
        action: {
          label: "View Plans",
          onClick: () => navigate("/pricing")
        }
      });
      navigate("/pricing");
    }
  };

  const handleRequestPayout = () => {
    toast.success("Payout request submitted!", {
      description: `$${creatorStats.pendingPayout} will be transferred to your ${selectedPayout} account within 3-5 business days.`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-900/50 text-green-200';
      case 'Pending Review':
        return 'bg-yellow-900/50 text-yellow-200';
      case 'Draft':
        return 'bg-gray-900/50 text-gray-200';
      default:
        return 'bg-gray-900/50 text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome, {user?.name || user?.email?.split('@')[0] || 'Creator'}!
              </h1>
              <p className="text-gray-400 mt-1">Manage your courses and track your earnings</p>
            </div>
            <Button 
              onClick={handleCreateCourse}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create New Course
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Earnings</p>
                  <p className="text-2xl font-bold text-white">${creatorStats.totalEarnings.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Pending Payout</p>
                  <p className="text-2xl font-bold text-white">${creatorStats.pendingPayout.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Students</p>
                  <p className="text-2xl font-bold text-white">{creatorStats.totalStudents.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-600/20 rounded-lg">
                  <Eye className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Views</p>
                  <p className="text-2xl font-bold text-white">{creatorStats.totalViews.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-600/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-teal-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Avg Completion</p>
                  <p className="text-2xl font-bold text-white">{creatorStats.avgCompletion}%</p>
                </div>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="courses" className="text-white">My Courses</TabsTrigger>
              <TabsTrigger value="earnings" className="text-white">Earnings</TabsTrigger>
              <TabsTrigger value="messages" className="text-white">Messages</TabsTrigger>
              <TabsTrigger value="analytics" className="text-white">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid gap-6">
                {myCourses.map((course) => (
                  <Card key={course.id} className="bg-card border-border p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                          <Badge className={getStatusColor(course.status)}>
                            {course.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Students</p>
                            <p className="text-white font-medium">{course.students.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Earnings</p>
                            <p className="text-white font-medium">${course.earnings.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Rating</p>
                            <p className="text-white font-medium">{course.rating > 0 ? `★ ${course.rating}` : 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Completion</p>
                            <p className="text-white font-medium">{course.completionRate}%</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-white border-gray-600">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-white border-gray-600">
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-6">
              <Card className="bg-card border-border p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Payout Settings</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Payout Method
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payout"
                          value="wise"
                          checked={selectedPayout === 'wise'}
                          onChange={(e) => setSelectedPayout(e.target.value)}
                          className="text-blue-600"
                        />
                        <span className="text-white">Wise (International Transfer)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payout"
                          value="payeer"
                          checked={selectedPayout === 'payeer'}
                          onChange={(e) => setSelectedPayout(e.target.value)}
                          className="text-blue-600"
                        />
                        <span className="text-white">Payeer</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"  
                          name="payout"
                          value="crypto"
                          checked={selectedPayout === 'crypto'}
                          onChange={(e) => setSelectedPayout(e.target.value)}
                          className="text-blue-600"
                        />
                        <span className="text-white">Crypto (USDT)</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-300">Pending Amount:</span>
                      <span className="text-2xl font-bold text-white">${creatorStats.pendingPayout}</span>
                    </div>
                    
                    <Button 
                      onClick={handleRequestPayout}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={creatorStats.pendingPayout < 50}
                    >
                      Request Payout
                    </Button>
                    
                    {creatorStats.pendingPayout < 50 && (
                      <p className="text-sm text-gray-400 mt-2 text-center">
                        Minimum payout amount is $50
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.id} className="bg-card border-border p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{message.student}</h4>
                          {message.unread && (
                            <div className="w-2 h-2 bg-blue-400 rounded-full" />
                          )}
                          <span className="text-gray-400 text-sm ml-auto">{message.time}</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">Course: {message.course}</p>
                        <p className="text-gray-300">{message.message}</p>
                        <Button size="sm" variant="outline" className="mt-3 text-white border-gray-600">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card border-border p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Course Performance</h3>
                  <div className="space-y-4">
                    {myCourses.filter(c => c.status === 'Published').map((course) => (
                      <div key={course.id} className="flex justify-between items-center">
                        <span className="text-gray-300">{course.title}</span>
                        <div className="text-right">
                          <p className="text-white font-medium">{course.views} views</p>
                          <p className="text-sm text-gray-400">{course.completionRate}% completion</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="bg-card border-border p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-gray-300 text-sm">New student enrolled in React Course</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-gray-300 text-sm">Received 5-star review</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-gray-300 text-sm">Course completion milestone reached</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;