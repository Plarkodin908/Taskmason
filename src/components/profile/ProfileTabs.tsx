import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, MessageCircle, Share2, Bookmark, Eye, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
interface ProfileTabsProps {
  courses: Array<{
    id: number;
    title: string;
    author: string;
    likes: number;
    comments: number;
    views: number;
  }>;
}
const ProfileTabs = ({
  courses
}: ProfileTabsProps) => {
  const mockPosts: any[] = [];
  const mockComments: any[] = [];
  return <Tabs defaultValue="posts" className="animate-fade-in">
      <TabsList className="w-full grid grid-cols-4 mb-6 bg-forest/50 border border-mint/20">
        <TabsTrigger value="posts" className="bg-slate-900 hover:bg-slate-800 text-violet-200">Posts</TabsTrigger>
        <TabsTrigger value="comments" className="bg-slate-900 hover:bg-slate-800 text-violet-200">Comments</TabsTrigger>
        <TabsTrigger value="courses" className="bg-slate-900 hover:bg-slate-800 text-violet-100">Courses</TabsTrigger>
        <TabsTrigger value="activity" className="bg-slate-900 hover:bg-slate-800 text-violet-100">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="space-y-4">
        {mockPosts.length === 0 ? (
          <Card className="bg-forest-light border border-mint/10 p-8 text-center">
            <p className="text-white/70">No posts yet. Start sharing your thoughts!</p>
          </Card>
        ) : (
          mockPosts.map(post => (
            <Card key={post.id} className="bg-forest-light border border-mint/10 p-6 hover:border-mint/20 transition-colors">
              {/* ... keep existing post content ... */}
            </Card>
          ))
        )}
      </TabsContent>

      <TabsContent value="comments" className="space-y-4">
        {mockComments.length === 0 ? (
          <Card className="bg-forest-light border border-mint/10 p-8 text-center">
            <p className="text-white/70">No comments yet. Join conversations to share your thoughts!</p>
          </Card>
        ) : (
          mockComments.map(comment => (
            <Card key={comment.id} className="bg-forest-light border border-mint/10 p-4 hover:border-mint/20 transition-colors">
              {/* ... keep existing comment content ... */}
            </Card>
          ))
        )}
      </TabsContent>

      <TabsContent value="courses" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => <Card key={course.id} className="bg-forest-light border border-mint/10 p-6 hover:border-mint/20 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
              <p className="text-white/60 text-sm mb-4">by {course.author}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {course.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {course.comments}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {course.views}
                  </div>
                </div>
                
                <Button size="sm" className="bg-mint hover:bg-mint/90 text-forest">
                  View Course
                </Button>
              </div>
            </Card>)}
        </div>
      </TabsContent>

      <TabsContent value="activity">
        <div className="space-y-4">
          <Card className="bg-forest-light border border-mint/10 p-4 hover:border-mint/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white/80">Upvoted "Best practices for responsive design in 2024"</span>
              <span className="ml-auto text-sm text-white/60">2 hours ago</span>
            </div>
          </Card>
          <Card className="bg-forest-light border border-mint/10 p-4 hover:border-mint/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-mint rounded-full animate-pulse"></div>
              <span className="text-white/80">Commented on "Advanced React Patterns"</span>
              <span className="ml-auto text-sm text-white/60">1 day ago</span>
            </div>
          </Card>
          <Card className="bg-forest-light border border-mint/10 p-4 hover:border-mint/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-white/80">Started following Michael Chen</span>
              <span className="ml-auto text-sm text-white/60">2 days ago</span>
            </div>
          </Card>
        </div>
      </TabsContent>
    </Tabs>;
};
export default ProfileTabs;