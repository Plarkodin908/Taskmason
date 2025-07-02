
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import VerifiedBadge from '@/components/profile/VerifiedBadge';
import { Settings, Calendar, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const { user } = useAuth();
  const [selectedGender, setSelectedGender] = useState('prefer-not-to-say');
  const [isEditing, setIsEditing] = useState(false);
  
  if (!user) {
    return (
      <div className="relative min-h-screen bg-black">
        <div className="animated-pattern-container"></div>
        <div className="animated-pattern-overlay"></div>
        <Navbar />
        <div className="container mx-auto pt-24 pb-16 px-4 text-center">
          <h2 className="text-xl text-white mb-4">Please sign in to view your profile</h2>
        </div>
      </div>
    );
  }

  const mockCourses = [
    {
      id: 1,
      title: "My JavaScript Course",
      author: user.name || "You",
      likes: 45,
      comments: 12,
      views: 890
    },
    {
      id: 2,
      title: "React Basics Tutorial", 
      author: user.name || "You",
      likes: 78,
      comments: 23,
      views: 1540
    }
  ];

  const handleProfilePictureChange = (url: string) => {
    console.log('Profile picture changed:', url);
  };

  const handleCoverPictureChange = (url: string) => {
    console.log('Cover picture changed:', url);
  };

  return (
    <div className="relative bg-black min-h-screen">
      {/* Animated background pattern */}
      <div className="animated-pattern-container"></div>
      <div className="animated-pattern-overlay"></div>
      
      <Navbar />
      
      {/* Cover Section */}
      <div className="relative pt-16">
        <div className="h-56 md:h-64 bg-gradient-to-br from-mint/20 via-forest/40 to-mint/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-mint/30 via-forest-light/60 to-forest/80" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* Profile Header */}
        <div className="container mx-auto px-4 relative">
          <div className="bg-forest-light/95 backdrop-blur-sm border border-mint/20 rounded-xl -mt-24 relative z-10 p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Profile Info Section */}
              <div className="flex flex-col md:flex-row gap-6 flex-1">
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="h-32 w-32 md:h-36 md:w-36 border-4 border-mint/30 shadow-lg">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name || "User"} />
                    ) : (
                      <AvatarFallback className="bg-forest text-mint text-4xl font-bold">
                        {user.name?.substring(0, 2) || user.email?.substring(0, 2) || "UN"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{user.name || "Your Name"}</h1>
                    {user.verificationStatus === "verified" && (
                      <VerifiedBadge size="md" />
                    )}
                  </div>
                  
                  <p className="text-mint text-xl mb-4">Learning Enthusiast</p>
                  
                  {/* Contact Info */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/60 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-mint" />
                      Member since 2024
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-forest/50 rounded-lg border border-mint/10">
                      <p className="text-2xl font-bold text-mint">1,234</p>
                      <p className="text-white/60 text-xs">Karma</p>
                    </div>
                    <div className="text-center p-3 bg-forest/50 rounded-lg border border-mint/10">
                      <p className="text-2xl font-bold text-white">56</p>
                      <p className="text-white/60 text-xs">Followers</p>
                    </div>
                    <div className="text-center p-3 bg-forest/50 rounded-lg border border-mint/10">
                      <p className="text-2xl font-bold text-white">89</p>
                      <p className="text-white/60 text-xs">Following</p>
                    </div>
                    <div className="text-center p-3 bg-forest/50 rounded-lg border border-mint/10">
                      <p className="text-2xl font-bold text-white">12</p>
                      <p className="text-white/60 text-xs">Posts</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-3 min-w-[220px]">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-mint hover:bg-mint/90 text-forest"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="xl:col-span-1">
            {isEditing ? (
              <ProfileSidebar
                selectedGender={selectedGender}
                onGenderChange={setSelectedGender}
                isEditing={isEditing}
                onProfilePictureChange={handleProfilePictureChange}
                onCoverPictureChange={handleCoverPictureChange}
              />
            ) : (
              <div className="space-y-6">
                {/* About Section */}
                <Card className="bg-forest-light/95 backdrop-blur-sm border border-mint/20 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-mint" />
                    About
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    Welcome to my profile! I'm passionate about learning and sharing knowledge with the community.
                  </p>
                </Card>

                {/* Skills Section */}
                <Card className="bg-forest-light/95 backdrop-blur-sm border border-mint/20 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'React', 'Node.js', 'Python', 'CSS'].map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-mint/20 text-mint hover:bg-mint/30 border border-mint/30"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>
          
          {/* Main Content Area */}
          <div className="xl:col-span-3">
            <ProfileTabs courses={mockCourses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
